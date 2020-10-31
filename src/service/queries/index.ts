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

export const RESOURCE_DETAIL = gql`
  query Resource($id: String!) {
    resource(id: $id) {
      categories
      description
      id
      link
      name
      picture_name
      rating
      tags
    }
  }
`
