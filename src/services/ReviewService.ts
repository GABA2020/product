import { firestore } from 'firebase';
import moment from 'moment';
import { DTO } from 'types/DTO';
import { db } from 'helpers/firebase.module';

const limitContent = 6;

const addNewReview = async (payload: DTO.Locker.AddReviewRequest) => {
  const lockerRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('reviews')
    .add({
      resource_id: payload.review.resource_id,
      review_body: payload.review.review_body,
      subject: payload.review.subject,
      date_time: firestore.Timestamp.fromDate(
        moment.unix(payload.review.date_time.seconds).toDate(),
      ),
      updated_at: firestore.Timestamp.fromDate(
        moment.unix(payload.review.updated_at.seconds).toDate(),
      ),
      rating: payload.review.rating,
    });
  return { review: { ...payload.review } } as DTO.Locker.AddReviewResponse;
};
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
export { addNewReview, getReviews, getMoreReviews };
