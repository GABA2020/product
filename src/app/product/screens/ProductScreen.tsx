import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import {
  ReviewModal,
  ReplyModal,
  ReviewsSection,
  BoardSection
} from '../components';

import { LoaderModal } from '../../genericComponents'
import { storageFB } from '../../../helpers/firebase.module';
import { img_board } from '../../../assets/images';
import { GApageView } from 'app';
import { Context } from 'app/globalContext/GlobalContext';

import {
  RESOURCE_DETAIL,
  GET_LOCKER,
  GET_RESOURCE_COMMENTS,
  GET_RESOURCE_PERCENTAGE,
  GET_HELPFUL_REVIEWS,
} from '../../../service/queries';
import {
  DELETE_FROM_LOCKER,
  ADD_RESOURCE_TO_LOCKER,
  ADD_HELPFUL_REVIEW,
  DELETE_HELPFUL_REVIEW,
} from '../../../service/mutations';

interface params {
  id: string;
}

const Product = () => {
  let { id }: params = useParams();
  GApageView(`Product ${id}`);

  const {
    state: { user },
  } = useContext(Context);
  const email = user.email;
  const [onLocker, setOnLocker] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [replyModal, setReplyModal] = useState({
    commentId: '',
    visibility: false,
  });
  const [resourceDetail, setResourceDetail] = useState({
    name: '',
    description: '',
    rating: 0,
    reviewsCount: 1,
    picture_name: '',
    link: '',
    stars_1: 0,
    stars_2: 0,
    stars_3: 0,
    stars_4: 0,
    stars_5: 0,
  });
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [imageUrl, setImageUrl] = useState(img_board);

  //gql
  const {
    loading: loadingLocker,
    data: lockerResponse,
    refetch: fetchLocker,
  } = useQuery(GET_LOCKER, { variables: { email } });

  const { refetch: fetchHelpfulReviews } = useQuery(GET_HELPFUL_REVIEWS, {
    onCompleted: data => {
      setHelpfulReviews(data.helpful_review);
    },
    variables: {
      resourceId: id,
      userId: email,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [fetchComments, { loading: loadingComments }] = useLazyQuery(
    GET_RESOURCE_COMMENTS,
    {
      onCompleted: data => {
        setComments(prevComments => [
          ...prevComments,
          ...data.resourceComments,
        ]);
      },
    },
  );

  const [refetchCurrentComments] = useLazyQuery(GET_RESOURCE_COMMENTS, {
    onCompleted: data => setComments(prevComments => data.resourceComments),
  });

  const [removeFromLocker] = useMutation(DELETE_FROM_LOCKER);
  const [addToLocker] = useMutation(ADD_RESOURCE_TO_LOCKER);
  const [addHelpfulReview] = useMutation(ADD_HELPFUL_REVIEW, {
    onCompleted: () => {
      fetchHelpfulReviews();
    },
  });
  const [removeHelpfulReview] = useMutation(DELETE_HELPFUL_REVIEW, {
    onCompleted: () => {
      fetchHelpfulReviews();
    },
  });

  const { data: resourceDetailResponse, loading: loadingResource } = useQuery(
    RESOURCE_DETAIL,
    {
      variables: { id },
      onCompleted: data => {
        console.log('Data here: ', data);
        setResourceDetail(data.resource);
      },
      onError: err => console.log(err),
    },
  );

  const {
    data: resourcePercentageResponse,
    loading: loadingPercentage,
  } = useQuery(GET_RESOURCE_PERCENTAGE, { variables: { resourceId: id } });

  const handleLockerButtonPress = async (isOnLocker: boolean) => {
    try {
      if (isOnLocker) {
        await removeFromLocker({
          variables: {
            user_id: email,
            resource_id: id,
          },
        });
      } else {
        await addToLocker({
          variables: {
            user_id: email,
            resource_id: id,
          },
        });
      }
      fetchLocker();
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  useEffect(() => {
    if (lockerResponse) {
      const index = lockerResponse.resources_locker.findIndex(
        lockerResource => lockerResource.resource_id === id,
      );
      setOnLocker(index > -1);
    }
  }, [lockerResponse, resourceDetail.picture_name]);

  useEffect(() => {
    fetchComments({ variables: { id, limit: 5, offset: 0 } });
  }, []);

  const handleLoadMore = () => {
    setOffset(prevOffset => {
      const newOffset = prevOffset + 5;
      fetchComments({ variables: { id, limit: 5, offset: newOffset } });

      return newOffset;
    });
  };

  const reloadCurrentComments = () => {
    refetchCurrentComments({ variables: { id, limit: offset, offset: 0 } });
  };

  const markReviewAsHelpful = (commentId: string, isHelpful: boolean) => {
    if (!isHelpful)
      addHelpfulReview({
        variables: {
          commentId,
          userId: email,
          resourceId: id,
        },
      });
    else {
      removeHelpfulReview({
        variables: {
          commentId,
          userId: email,
        },
      });
    }
  };


  storageFB
    .ref('resources/')
    .child(`${resourceDetail.picture_name}`)
    .getDownloadURL()
    .then(url => {
      setImageUrl(url);
    })
    .catch(err => {
      console.log({
        err,
      });
    });

  const stars = {
    stars_1: resourceDetail.stars_1,
    stars_2: resourceDetail.stars_2,
    stars_3: resourceDetail.stars_3,
    stars_4: resourceDetail.stars_4,
    stars_5: resourceDetail.stars_5,
  };




  return (loadingResource || loadingLocker || loadingPercentage || loadingComments) ? (<LoaderModal />) : (
    <section id="page_content">
      <BoardSection
        title={resourceDetail.name}
        description={resourceDetail.description}
        rating={resourceDetail.rating}
        reviewsCount={resourceDetail.reviewsCount}
        onLocker={onLocker}
        onLockerButtonPress={handleLockerButtonPress}
        handleCreateReview={() => setModalVisibility(true)}
        imageUrl={imageUrl}
        link={resourceDetail.link}
      />
      <ReviewsSection
        loadMore={handleLoadMore}
        comments={comments.map(comment => {
          const isHelpful = !!helpfulReviews.filter(
            (review: any) => review.resource_review_id === comment.id,
          ).length;
          return isHelpful ? { ...comment, isHelpful: true } : comment;
        })}
        handleReply={setReplyModal}
        markReviewAsHelpful={markReviewAsHelpful}
        stars={stars}
        reviewsCount={resourceDetail.reviewsCount}
        rating={resourceDetail.rating}
        handleCreateReview={() => setModalVisibility(true)}
      />
      {/* <ResourcesSection /> */}
      {modalVisibility && (
        <ReviewModal onClose={() => setModalVisibility(false)} />
      )}
      {replyModal.visibility && (
        <ReplyModal
          onClose={() => setReplyModal({ visibility: false, commentId: '' })}
          commentId={replyModal.commentId}
          handleReload={reloadCurrentComments}
        />
      )}
    </section>
  );
};

export default Product;
