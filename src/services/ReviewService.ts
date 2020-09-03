import { DTO } from 'types/DTO';
import { db } from 'helpers/firebase.module';

const limitContent = 6;

const getReviews = async (payload: DTO.Locker.Review.GetReviewsRequest) => {
  const reviews: ENTITIES.UserResource[] = [];

  const lockerRef = db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const reviewCollection = await lockerRef
    .orderBy('created_at', 'asc')
    .limit(limitContent)
    .get();

  const reviewLength = (await lockerRef.get()).size;

  let lastQuery = reviewCollection.docs[reviewCollection.docs.length - 1].get(
    'created_at',
  );

  reviewCollection.forEach(doc => {
    reviews.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.UserResource);
  });

  return {
    reviews,
    lastQuery,
    reviewLength,
  };
};

const getMoreReviews = async (
  payload: DTO.Locker.Review.GetMoreReviewsRequest,
) => {
  const reviews: ENTITIES.UserResource[] = [];

  const lockerRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('resources');

  const nextReviewCollection = await lockerRef
    .orderBy('created_at', 'asc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  let lastQuery = nextReviewCollection.docs[
    nextReviewCollection.docs.length - 1
  ].get('created_at');

  nextReviewCollection.forEach(doc => {
    reviews.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.UserResource);
  });

  return { reviews, lastQuery };
};
export { getReviews, getMoreReviews };
