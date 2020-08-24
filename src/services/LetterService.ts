import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getLetters = async (payload: DTO.User.Letter.GetLettersRequest) => {
  const letters: ENTITIES.Letter[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('letter');
  const letterCollection = await userRef.get();
  letterCollection.forEach(doc => {
    letters.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Letter);
  });
  return { letters: letters };
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
    receive_date: payload.letter.receive_date,
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
    receive_date: payload.letter.receive_date,
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

export { getLetters, addNewLetter, editLetter, deleteLetter };
