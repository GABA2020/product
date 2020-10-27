import { gql } from '@apollo/client';

export const RESOURCES = gql`
  query Resources($limit: Int!) {
    resources(limit: $limit) {
      id
      tags
      categories
      description
      link
      name
      picture_name
      rating
    }
  }
`;
