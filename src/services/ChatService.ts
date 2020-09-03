import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';
import { convertDateToTimestamp } from 'helpers/Unity';

const limitMessage = 10;

const listenListLastMessage = (
  payload: DTO.Chat.ListenListLastMessageRequest,
  onchange: (listLastMessage: any[]) => void,
) => {
  const chatRef = db
    .collection('chat')
    .where('users', 'array-contains', `${payload.email}`);
  return chatRef.onSnapshot(onNext => {
    const listLastMessage = onNext.docs.map(item => item.data());
    onchange(listLastMessage);
  });
};

const getListMessage = async (payload: DTO.Chat.GetListMessageRequest) => {
  const listMessage: ENTITIES.Message[] = [];

  const chatRef = await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .collection('messages');

  const messages_length = await (await chatRef.get()).size;

  const chatRefLimit = await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .collection('messages')
    .orderBy('created_at', 'desc')
    .limit(limitMessage)
    .get();

  const last_query = chatRefLimit.docs[chatRefLimit.docs.length - 1].get(
    'created_at',
  );

  chatRefLimit.docs.forEach(item => {
    listMessage.push({ id: item.id, ...item.data() } as ENTITIES.Message);
  });
  return {
    listMessage,
    messages_length,
    last_query,
  } as DTO.Chat.GetListMessageResponse;
};

const getMoreListMessage = async (
  payload: DTO.Chat.GetMoreListMessageRequest,
) => {
  const listMessage: ENTITIES.Message[] = [];

  const chatRefLimit = await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .collection('messages')
    .orderBy('created_at', 'desc')
    .startAfter(payload.last_query)
    .limit(limitMessage)
    .get();

  const last_query = chatRefLimit.docs[chatRefLimit.docs.length - 1].get(
    'created_at',
  );

  chatRefLimit.docs.forEach(item => {
    listMessage.push({ id: item.id, ...item.data() } as ENTITIES.Message);
  });

  return {
    listMessage,
    last_query,
  } as DTO.Chat.GetMoreListMessageResponse;
};

const sendMessage = async (payload: DTO.Chat.SendMessageRequest) => {
  // add new Message
  await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .collection('messages')
    .add({
      content: payload.message.content,
      created_at: firestore.Timestamp.fromDate(
        moment.unix(payload.message.created_at.seconds).toDate(),
      ),
      sender_email: payload.message.sender_email,
    });

  // update last message
  await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .set({
      created_at: firestore.Timestamp.fromDate(
        moment.unix(payload.lastMessage.created_at.seconds).toDate(),
      ),
      is_received: payload.lastMessage.is_received,
      last_message: payload.lastMessage.last_message,
      sender_email: payload.lastMessage.sender_email,
      users: payload.lastMessage.users,
      connect_status: payload.lastMessage.connect_status,
    });

  return {
    message: payload.message,
    lastMessage: payload.lastMessage,
  } as DTO.Chat.SendMessageResponse;
};

const listenNewMessage = (
  payload: DTO.Chat.listenNewMessageRequest,
  onchange: (newMessages: ENTITIES.Message[]) => void,
) => {
  const chatRef = db
    .collection('chat')
    .doc(payload.users_mail_key)
    .collection('messages')
    .orderBy('created_at', 'asc');

  return chatRef.onSnapshot(onNext => {
    const chats: ENTITIES.Message[] = onNext.docs.map(item => {
      return {
        id: item.id,
        ...item.data(),
      } as ENTITIES.Message;
    });
    onchange(chats);
  });
};

const setMessageToRead = async (payload: DTO.Chat.SetMessageToReadRequest) => {
  return await db.collection('chat').doc(payload.users_mail_key).update({
    is_received: true,
  });
};

const connectUser = async (payload: DTO.Chat.ConnectUserRequest) => {
  const users = payload.users_mail_key.split(':');

  const newCreateDate = convertDateToTimestamp(moment().toISOString());

  const lastMessage: ENTITIES.LastMessage = {
    last_message: '',
    connect_status: 1,
    created_at: { seconds: newCreateDate },
    sender_email: payload.senderEmail,
    users: users,
    is_received: false,
  };

  await db
    .collection('chat')
    .doc(payload.users_mail_key)
    .set({
      last_message: '',
      connect_status: lastMessage.connect_status,
      sender_email: lastMessage.sender_email,
      users: lastMessage.users,
      is_received: lastMessage.is_received,
      created_at: firestore.Timestamp.fromDate(
        moment.unix(lastMessage.created_at.seconds).toDate(),
      ),
    });

  return {
    users_mail_key: payload.users_mail_key,
  } as DTO.Chat.ConnectUserResponse;
};

const isUserConnected = async (users_mail_key: string) => {
  const chatRef = await db.collection('chat').doc(users_mail_key).get();
  if (chatRef.exists) return true;
  return false;
};

const responseConnect = async (payload: DTO.Chat.ResponseConnectRequest) => {
  const users_email_key = payload.lastMessage.users.join(':');

  if (payload.lastMessage.connect_status === 2) {
    await db
      .collection('chat')
      .doc(users_email_key)
      .update({
        connect_status: 2,
        created_at: firestore.Timestamp.fromDate(
          moment.unix(payload.lastMessage.created_at.seconds).toDate(),
        ),
        is_received: payload.lastMessage.is_received,
        sender_email: payload.lastMessage.sender_email,
      });
  }

  if (payload.lastMessage.connect_status === 0) {
    await db.collection('chat').doc(users_email_key).delete();
  }
};

export {
  connectUser,
  isUserConnected,
  listenListLastMessage,
  getListMessage,
  getMoreListMessage,
  sendMessage,
  listenNewMessage,
  setMessageToRead,
  responseConnect,
};
