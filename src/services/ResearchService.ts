import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getResearches = async (
  payload: DTO.User.Research.GetResearchesRequest,
) => {
  const researches: ENTITIES.Research[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research');
  const researchCollection = await userRef.get();
  researchCollection.forEach(doc => {
    researches.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Research);
  });
  return { researches: researches };
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
    event_date: payload.research.event_date,
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
    event_date: payload.research.event_date,
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
  const researchCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('research')
    .doc(payload.id)
    .delete();
};

export { getResearches, addNewResearch, editResearch, deleteResearch };
