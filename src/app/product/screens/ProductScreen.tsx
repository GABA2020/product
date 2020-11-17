import React, { Fragment, useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import BoardSection from '../components/BoardSection';
import ReviewsSection from '../components/ReviewsSection/';
import ResourcesSection from '../components/ResourcesSection/';
import ReviewModal from '../components/ReviewModal';
import { RESOURCE_DETAIL, GET_LOCKER, GET_RESOURCE_COMMENTS, } from '../../../service/queries';
import { DELETE_FROM_LOCKER, ADD_RESOURCE_TO_LOCKER } from '../../../service/mutations';

interface params {
  id: string
}

const Product = () => {
  let { id }: params = useParams();

  const email = useSelector((state: any) => state.auth.email);
  const [onLocker, setOnLocker] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [offset, settOffset] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [resourceDetail, setResourceDetail] = useState({
    name: '',
    description: '',
    rating: 0
  });

  //gql
  const { 
    loading: loadingLocker,
    data: lockerResponse,
    refetch: fetchLocker
  }= useQuery(GET_LOCKER, { variables: { email }});
  const [fetchComments, { loading: loadingComments }] = useLazyQuery(
    GET_RESOURCE_COMMENTS, 
    { 
      onCompleted: data => {
        setComments((prevComments) => [...prevComments, ...data.resourceComments])
      }
    })
  const [removeFromLocker] = useMutation(DELETE_FROM_LOCKER);
  const [addToLocker] = useMutation(ADD_RESOURCE_TO_LOCKER);
  const {data: resourceDetailResponse, loading: loadingResource} = useQuery(RESOURCE_DETAIL, {
    variables: { id },
    onCompleted: data => {
      setResourceDetail(data.resource)
    }
  })

  const handleLockerButtonPress = async (isOnLocker: boolean)=> {
    try {
      if (isOnLocker) {
        await removeFromLocker({ variables: {
          user_id: email,
          resource_id: id
        }})
      } else {
        await addToLocker({ variables: {
          user_id: email,
          resource_id: id
        }})
      }
      fetchLocker()
    } catch (err) {
      console.log("Error: ", err)
    }
  };

  useEffect(() => {
    if (lockerResponse) {
      const index = lockerResponse
        .resources_locker
        .findIndex(lockerResource =>  lockerResource.resource_id === id);

      setOnLocker((index > -1));
    }
  }, [lockerResponse])

  useEffect(() => {
    fetchComments({ variables: {id, limit: 5, offset: 0 }})
  }, [])

  const handleLoadMore = () => {
    settOffset(prevOffset => {
      const newOffset = prevOffset + 5
      fetchComments({ variables: {id, limit: 5, offset: newOffset }})

      return newOffset
    })
  }

  if (loadingResource || loadingLocker) return null;

  return (
    <section id="page_content">
      <BoardSection 
        title={resourceDetail.name}
        description={resourceDetail.description}
        rating={resourceDetail.rating}
        onLocker={onLocker}
        onLockerButtonPress={handleLockerButtonPress}
      />
      <ReviewsSection
        handleCreateReview={() => setModalVisibility(true)}
        loadMore={handleLoadMore}
        comments={comments}
      />
      <ResourcesSection />
      {
        modalVisibility && (
          <ReviewModal onClose={() => setModalVisibility(false)}/>
        )
      }
    </section>
  );
};

export default Product;
