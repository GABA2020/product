import { DTO } from 'types/DTO';
import { db } from 'helpers/firebase.module';

const limitContent = 6;

const getReviews = async (payload: DTO.Locker.GetReviewsRequest) => {
  const reviews: ENTITIES.Review[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('reviews');

  const reviewCollection = await lockerRef
    .orderBy('date_time', 'asc')
    .limit(limitContent)
    .get();

  const arrayLength = (await lockerRef.get()).size;

  let lastQuery = reviewCollection.docs[reviewCollection.docs.length - 1].get(
    'date_time',
  );

  reviewCollection.forEach(doc => {
    reviews.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Review);
  });

  return {
    reviews,
    lastQuery,
    arrayLength,
  };
};

const getMoreReviews = async (payload: DTO.Locker.GetMoreReviewsRequest) => {
  const reviews: ENTITIES.Review[] = [];

  const lockerRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('reviews');

  const nextReviewCollection = await lockerRef
    .orderBy('date_time', 'asc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  let lastQuery = nextReviewCollection.docs[
    nextReviewCollection.docs.length - 1
  ].get('date_time');

  nextReviewCollection.forEach(doc => {
    reviews.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Review);
  });

  return { reviews, lastQuery };
};

const getResources = async (
  payload: DTO.Locker.Resource.getResourcesRequest,
) => {
  const resources: ENTITIES.Resource[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const resourceCollection = await lockerRef
    .orderBy('date', 'asc')
    .limit(limitContent)
    .get();

  const arrayLength = (await lockerRef.get()).size;

  let lastQuery = resourceCollection.docs[
    resourceCollection.docs.length - 1
  ].get('date');

  resourceCollection.forEach(doc => {
    resources.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Resource);
  });

  return {
    resources,
    arrayLength,
    lastQuery,
  };
};

const getMoreResources = async (
  payload: DTO.Locker.Resource.getMoreResourcesRequest,
) => {
  const resources: ENTITIES.Resource[] = [];

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
    resources.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Resource);
  });

  return {
    resources,
    lastQuery,
  };
};

const getResourceDetail = async (
  payload: DTO.Locker.Resource.GetResourceDetailRequest,
) => {
  let resource: ENTITIES.Resource = {
    id: '',
    match_score: 0,
    name: '',
    date: {
      seconds: 0,
    },
    picture_name: '',
    rating: 0,
  };

  const lockerRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources')
    .doc(payload.id);

  const resourceCollection = await lockerRef.get();

  resource = {
    id: payload.id,
    ...resourceCollection.data(),
  } as ENTITIES.Resource;

  return {
    id: payload.id,
    resource,
  };
};
export {
  getReviews,
  getMoreReviews,
  getResources,
  getMoreResources,
  getResourceDetail,
};
