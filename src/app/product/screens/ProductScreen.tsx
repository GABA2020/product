import React, { Fragment } from 'react';
import {
  useParams
} from "react-router-dom";
import { useQuery } from '@apollo/client';

import BoardSection from '../components/BoardSection';
import ReviewsSection from '../components/ReviewsSection/';
import ResourcesSection from '../components/ResourcesSection/';
import { RESOURCE_DETAIL } from '../../../service/queries';

interface params {
  id: string
}

const Product = () => {
  let { id }: params = useParams();
  console.log({id})
  const {data, loading} = useQuery(RESOURCE_DETAIL, {
    variables: { id }
  })

  if (loading) return null;

  return (
    <section id="page_content">
      <BoardSection 
        title={data.resource.name}
        description={data.resource.description}
        rating={data.resource.rating}
      />
      <ReviewsSection />
      <ResourcesSection />
    </section>
  );
};

export default Product;
