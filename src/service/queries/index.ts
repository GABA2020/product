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

export const ADDUSERRESEARCH = gql`
  mutation(
    $author: String!
    $email: String!
    $event_date: String!
    $event_name: String!
    $journal: String!
    $link: String!
    $primary_investigator: String!
    $research_type: String!
    $show_link: Boolean!
    $work_title: String!
  ) {
    addUserResearch(
      userResearchData: {
        author: $author
        email: $email
        event_date: $event_date
        event_name: $event_name
        jurnal: $journal
        link: $link
        primary_investigator: $primary_investigator
        research_type: $research_type
        show_link: $show_link
        work_title: $work_title
      }
    )
  }
`;

export const ADDUSERVOLUNTEER = gql`
  mutation(
    $city: String!
    $description: String!
    $email: String!
    $end_date: String!
    $job_title: String!
    $nbr_hours_served: Int!
    $organization_name: String!
    $start_date: String!
  ) {
    addUserVolunteer(
      userVolunteerData: {
        city: $city
        description: $description
        email: $email
        end_date: $end_date
        job_title: $job_title
        nbr_hours_served: $nbr_hours_served
        organization_name: $organization_name
        start_date: $start_date
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
`;

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
`;

export const GET_LOCKER = gql`
  query getResources($email: String!) {
    resources_locker(where: { user_id: { _eq: $email } }) {
      resource_id
    }
  }
`;
