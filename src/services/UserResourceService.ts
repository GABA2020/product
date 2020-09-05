import { db } from 'helpers/firebase.module';
import { firestore } from 'firebase';
import moment from 'moment';
import { DTO } from 'types/DTO';

const limitContent = 6;

const addNewUserResource = async (
  payload: DTO.Locker.UserResource.AddUserResourceRequest,
) => {
  await db
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
      rating: payload.userResource.rating,
      subject: payload.userResource.subject,
      review_body: payload.userResource.review_body,
      updated_at: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.updated_at.seconds).toDate(),
      ),
      created_at: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.created_at.seconds).toDate(),
      ),
    });
  return {
    userResource: { ...payload.userResource },
  } as DTO.Locker.UserResource.AddUserResourceResponse;
};

const editUserResource = async (
  payload: DTO.Locker.UserResource.EditUserResourceRequest,
) => {
  console.log(payload);
  await db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources')
    .doc(payload.userResource.id)
    .set({
      resource_id: payload.userResource.resource_id,
      match_score: 0,
      date: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.date.seconds).toDate(),
      ),
      actual_exam: payload.userResource.actual_exam,
      actual_exam_score: payload.userResource.actual_exam_score,
      rating: payload.userResource.rating,
      subject: payload.userResource.subject,
      review_body: payload.userResource.review_body,
      updated_at: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.updated_at.seconds).toDate(),
      ),
      created_at: firestore.Timestamp.fromDate(
        moment.unix(payload.userResource.created_at.seconds).toDate(),
      ),
    });
  return {
    userResource: { ...payload.userResource },
  } as DTO.Locker.UserResource.EditUserResourceResponse;
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
    .orderBy('created_at', 'asc')
    .limit(limitContent)
    .get();

  const userResourceLength = (await lockerRef.get()).size;

  let lastQuery = resourceCollection.docs[
    resourceCollection.docs.length - 1
  ].get('created_at');

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
    .orderBy('created_at', 'asc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  let lastQuery = resourceCollection.docs[
    resourceCollection.docs.length - 1
  ].get('created_at');

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

const getAllUserResources = async (
  payload: DTO.Locker.UserResource.getAllUserResourcesRequest,
) => {
  const userResources: ENTITIES.UserResource[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const resourceCollection = await lockerRef.orderBy('created_at', 'asc').get();

  resourceCollection.forEach(doc => {
    userResources.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.UserResource);
  });

  return {
    userResources,
  } as DTO.Locker.UserResource.getAllUserResourcesResponse;
};

const deleteUserResource = async (
  payload: DTO.Locker.UserResource.DeleteUserResourceRequest,
) => {
  await db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources')
    .doc(payload.userResource.id)
    .delete();
  return {
    userResource: payload.userResource,
  } as DTO.Locker.UserResource.DeleteUserResourceResponse;
};
export {
  addNewUserResource,
  getUserResources,
  getMoreUserResources,
  getAllUserResources,
  editUserResource,
  deleteUserResource,
};
