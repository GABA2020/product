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

  const reviewLength = (await lockerRef.get()).size;

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
    reviewLength,
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
export { getReviews, getMoreReviews };
