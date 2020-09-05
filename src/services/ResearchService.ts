import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';

const limitContent = 5;

const getResearches = async (
  payload: DTO.User.Research.GetResearchesRequest,
) => {
  const researches: ENTITIES.Research[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research');

  const arrayLength = await (await userRef.get()).size;

  const researchCollection = await userRef
    .orderBy('event_date', 'desc')
    .limit(limitContent)
    .get();

  const lastQuery = researchCollection.docs[
    researchCollection.docs.length - 1
  ].get('event_date');

  researchCollection.forEach(doc => {
    researches.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Research);
  });

  return { researches, arrayLength, lastQuery };
};

const getAllResearches = async (
  payload: DTO.User.Research.GetAllResearchesRequest,
) => {
  const researches: ENTITIES.Research[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research');

  const researchCollection = await userRef.orderBy('event_date', 'desc').get();

  researchCollection.forEach(doc => {
    researches.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Research);
  });

  return { researches };
};

const getMoreResearches = async (
  payload: DTO.User.Research.GetMoreResearchesRequest,
) => {
  const researches: ENTITIES.Research[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research');

  const researchCollection = await userRef
    .orderBy('event_date', 'desc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  const lastQuery = researchCollection.docs[
    researchCollection.docs.length - 1
  ].get('event_date');

  researchCollection.forEach(doc => {
    researches.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Research);
  });

  return { researches, lastQuery };
};

const addNewResearch = async (
  payload: DTO.User.Research.AddNewResearchRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research');

  const researchCollection = await userRef.add({
    author: payload.research.author,
    event_address: payload.research.event_address,
    event_date: firestore.Timestamp.fromDate(
      moment.unix(payload.research.event_date.seconds).toDate(),
    ),
    event_name: payload.research.event_name,
    journal: payload.research.journal,
    link: payload.research.link,
    is_show_link: payload.research.is_show_link,
    primary_investigator: payload.research.primary_investigator,
    research_type: payload.research.research_type,
    title_of_work: payload.research.title_of_work,
  });
  return researchCollection;
};

const editResearch = async (payload: DTO.User.Research.EditResearchRequest) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research')
    .doc(payload.research.id);

  const researchCollection = await userRef.set({
    author: payload.research.author,
    event_address: payload.research.event_address,
    event_date: firestore.Timestamp.fromDate(
      moment.unix(payload.research.event_date.seconds).toDate(),
    ),
    event_name: payload.research.event_name,
    journal: payload.research.journal,
    link: payload.research.link,
    is_show_link: payload.research.is_show_link,
    primary_investigator: payload.research.primary_investigator,
    research_type: payload.research.research_type,
    title_of_work: payload.research.title_of_work,
  });
  return researchCollection;
};

const deleteResearch = async (
  payload: DTO.User.Research.DeleteResearchRequest,
) => {
  await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research')
    .doc(payload.id)
    .delete();
};

export {
  getResearches,
  getAllResearches,
  getMoreResearches,
  addNewResearch,
  editResearch,
  deleteResearch,
};
