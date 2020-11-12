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

export const USERS_QUERY = gql`
  query Users {
    users {
      creationDate
      degrees
      email
      gender
      last_login
      medicalSchool
      name
      student_status
      username
      year_in_program
    }
  }
`

export const GET_LOCKER = gql`
  query getResources($email: String!) {
    resources_locker(where: {
      user_id:{_eq: $email }
    }) {
      resource_id
    }
  }
`
