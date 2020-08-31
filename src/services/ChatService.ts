import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';

const getListLastMessage = async (
  payload: DTO.Chat.GetListLastMessageRequest,
) => {
  const listLastMessage: ENTITIES.LastMessage[] = [];
  const chatRef = await db
    .collection('chat')
    .where('users', 'array-contains', `${payload.email}`)
    .get();
  chatRef.docs.forEach(item => {
    listLastMessage.push({ ...(item.data() as ENTITIES.LastMessage) });
  });
  return { listLastMessage };
};

export { getListLastMessage };
