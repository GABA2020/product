import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import { firestore } from 'firebase';
import moment from 'moment';

const limitContent = 2;

const getLetters = async (payload: DTO.User.Letter.GetLettersRequest) => {
  const letters: ENTITIES.Letter[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter');

  const arrayLength = await (await userRef.get()).size;

  const letterCollection = await userRef
    .orderBy('receive_date', 'desc')
    .limit(limitContent)
    .get();

  const lastQuery = letterCollection.docs[letterCollection.docs.length - 1].get(
    'receive_date',
  );

  letterCollection.forEach(doc => {
    letters.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Letter);
  });
  return { letters, lastQuery, arrayLength };
};

const getMoreLetters = async (
  payload: DTO.User.Letter.GetMoreLettersRequest,
) => {
  const letters: ENTITIES.Letter[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter');

  const letterCollection = await userRef
    .orderBy('receive_date', 'desc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  const lastQuery = letterCollection.docs[letterCollection.docs.length - 1].get(
    'receive_date',
  );

  letterCollection.forEach(doc => {
    letters.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Letter);
  });
  return { letters, lastQuery };
};

const addNewLetter = async (payload: DTO.User.Letter.AddNewLetterRequest) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter');

  const letterCollection = await userRef.add({
    document_name: payload.letter.document_name,
    document_type: payload.letter.document_type,
    link: payload.letter.link,
    receive_date: firestore.Timestamp.fromDate(
      moment.unix(payload.letter.receive_date.seconds).toDate(),
    ),
    is_show_link: payload.letter.is_show_link,
  });
  return letterCollection;
};

const editLetter = async (payload: DTO.User.Letter.EditLetterRequest) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter')
    .doc(payload.letter.id);

  const letterCollection = await userRef.set({
    document_name: payload.letter.document_name,
    document_type: payload.letter.document_type,
    link: payload.letter.link,
    receive_date: firestore.Timestamp.fromDate(
      moment.unix(payload.letter.receive_date.seconds).toDate(),
    ),
    is_show_link: payload.letter.is_show_link,
  });
  return letterCollection;
};

const deleteLetter = async (payload: DTO.User.Letter.DeleteLetterRequest) => {
  const letterCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter')
    .doc(payload.id)
    .delete();
};

export { getLetters, getMoreLetters, addNewLetter, editLetter, deleteLetter };
