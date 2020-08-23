import { db } from 'helpers/firebase.module';
import { firestore } from 'firebase';
import moment from 'moment';
import { DTO } from 'types/DTO';

const limitContent = 6;

const addNewUserResource = async (
  payload: DTO.Locker.UserResource.AddUserResourceRequest,
) => {
  const lockerRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources')
    .add({
      resource_id: payload.userResource.resource_id,
      match_score: 0,
      date: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.date.seconds).toDate(),
      ),
      actual_exam: payload.userResource.actual_exam,
      actual_exam_score: payload.userResource.actual_exam_score,
    });
  return {
    userResource: { ...payload.userResource },
  } as DTO.Locker.UserResource.AddUserResourceResponse;
};

const getUserResources = async (
  payload: DTO.Locker.UserResource.getUserResourcesRequest,
) => {
  const userResources: ENTITIES.UserResource[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const resourceCollection = await lockerRef
    .orderBy('date', 'asc')
    .limit(limitContent)
    .get();

  const userResourceLength = (await lockerRef.get()).size;

  let lastQuery = resourceCollection.docs[
    resourceCollection.docs.length - 1
  ].get('date');

  resourceCollection.forEach(doc => {
    userResources.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.UserResource);
  });

  return {
    userResources,
    userResourceLength,
    lastQuery,
  };
};

const getMoreUserResources = async (
  payload: DTO.Locker.UserResource.getMoreUserResourcesRequest,
) => {
  const userResources: ENTITIES.UserResource[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const resourceCollection = await lockerRef
    .orderBy('date', 'asc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  let lastQuery = resourceCollection.docs[
    resourceCollection.docs.length - 1
  ].get('date');

  resourceCollection.forEach(doc => {
    userResources.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.UserResource);
  });

  return {
    userResources,
    lastQuery,
  };
};

export { addNewUserResource, getUserResources, getMoreUserResources };
