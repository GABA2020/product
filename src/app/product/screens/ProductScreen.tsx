import React, { Fragment, useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import BoardSection from '../components/BoardSection';
import ReviewsSection from '../components/ReviewsSection/';
import ResourcesSection from '../components/ResourcesSection/';
import { RESOURCE_DETAIL, GET_LOCKER, } from '../../../service/queries';
import { DELETE_FROM_LOCKER, ADD_RESOURCE_TO_LOCKER } from '../../../service/mutations';

interface params {
  id: string
}

const Product = () => {
  let { id }: params = useParams();
  const {data: resourceDetailResponse, loading: loadingResource} = useQuery(RESOURCE_DETAIL, {
    variables: { id }
  })
  const email = useSelector((state: any) => state.auth.email);
  const { 
    loading: loadingLocker,
    data: lockerResponse,
    refetch: fetchLocker
  }= useQuery(GET_LOCKER, { variables: { email }});
  const [removeFromLocker] = useMutation(DELETE_FROM_LOCKER);
  const [addToLocker] = useMutation(ADD_RESOURCE_TO_LOCKER);
  const [onLocker, setOnLocker] = useState(false)

  const handleLockerButtonPress = async (isOnLocker: boolean)=> {
    try {
      if (isOnLocker) {
        console.log("Entra")
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
        .findIndex(lockerResource => {
          console.log({
            id1: lockerResource.resource_id,
            id,
            condition: lockerResource.resource_id === id
          })
          
          return lockerResource.resource_id === id
        });

      setOnLocker((index > -1));
    }
  }, [lockerResponse])

  if (loadingResource || loadingLocker) return null;

  return (
    <section id="page_content">
      <BoardSection 
        title={resourceDetailResponse.resource.name}
        description={resourceDetailResponse.resource.description}
        rating={resourceDetailResponse.resource.rating}
        onLocker={onLocker}
        onLockerButtonPress={handleLockerButtonPress}
      />
      <ReviewsSection />
      <ResourcesSection />
    </section>
  );
};

export default Product;
