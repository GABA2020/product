import React, { Fragment } from 'react';
import BoardSection from '../components/BoardSection';
import ReviewsSection from '../components/ReviewsSection/';
import ResourcesSection from '../components/ResourcesSection/';

const Product = () => {
  return (
    <section id="page_content">
      <BoardSection />
      <ReviewsSection />
      <ResourcesSection />
    </section>
  );
};

export default Product;
