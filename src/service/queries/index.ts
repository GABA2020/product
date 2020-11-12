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

export const ADDUSERWORK = gql`
  mutation(
    $city: String!
    $company: String!
    $description: String!
    $email: String!
    $end_date: String!
    $start_date: String!
    $title: String!
  ) {
    addUserWork(
      userWorkData: {
        city: $city
        company: $company
        description: $description
        email: $email
        end_date: $end_date
        start_date: $start_date
        title: $title
      }
    )
  }
`;
