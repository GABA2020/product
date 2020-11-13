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
      price_from
      price_to
      reviewsCount
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
`;
export const CONNECTED_USERS = gql`
  query ConnectedUsers($email: String!) {
    connectedUsers(email: $email) {
      email
    }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      creationDate
      degrees
      email
      medicalSchool
      name
      student_status
      username
      year_in_program
      school_year
      specialties
      mcat
      step_1
      step_2
      step_3
    }
  }
`;

export const GET_LOCKER = gql`
  query getResources($email: String!) {
    resources_locker(where: { user_id: { _eq: $email } }) {
      resource_id
    }
  }
`;
