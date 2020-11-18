import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation(
    $email: String!
    $name: String!
    $last_name: String!
    $medical_school: String!
    $school_year: String!
    $username: String!
    $password: String!
    $verification_file: String!
  ) {
    createUser(
      userData: {
        email: $email
        last_name: $last_name
        medical_school: $medical_school
        name: $name
        password: $password
        school_year: $school_year
        username: $username
        verification_file: $verification_file
      }
    ) {
      user_uid
    }
  }
`;

export const GET_USER_ACCOUNT = gql`
  query($email: String!) {
    user_account(where: { email: { _eq: $email } }) {
      creation_date
      email
      last_name
      medical_school
      membership_type
      name
      payment_complete
      red_flag
      school_year
      uid
      username
      verified
    }
  }
`;
export const GET_USER_DATA = gql`
  query($email: String!) {
    user(email: $email) {
      avatar
      creationDate
      degrees
      email
      gender
      last_login
      mcat
      medicalSchool
      name
      school_year
      step_1
      specialties
      step_2
      step_3
      student_status
      username
      year_in_program
      works {
        id
        city
        company
        description
        end_date
        start_date
        title
        email
      }
      volunteers {
        id
        city
        description
        email
        end_date
        job_title
        nbr_hours_served
        organization_name
        start_date
      }
      schools {
        id
        city
        email
        degree_type
        end_date
        honors
        majors
        school
        start_date
      }
      researchs {
        id
        author
        email
        event_date
        event_name
        jurnal
        link
        primary_investigator
        show_link
        research_type
        work_title
      }
      letters {
        id
        document_name
        document_type
        email
        link
        receive_date
        show_link
      }
    }
  }
`;

export const RESOURCES = gql`
  query Resources($limit: Int, $offset: Int, $categories: [String]) {
    resources(limit: $limit, offset: $offset, categories: $categories) {
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

export const ADD_USER_WORK = gql`
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

export const ADD_USER_RESEARCH = gql`
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

export const ADD_USER_VOLUNTEER = gql`
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
      reviewsCount
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

export const UNVALIDATE_USERS = gql`
  query UnvalidatedUser {
    user_account(where: { verified: { _eq: false } }) {
      email
      name
      last_name
      medical_school
      school_year
      verification_file
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
  query GetLocker($email: String!) {
    resources_locker(where: { user_id: { _eq: $email } }) {
      resource_id
    }
  }
`;

export const GET_RESOURCE_COMMENTS = gql`
  query GetResourceComments($id: String!, $limit: Int, $offset: Int) {
    resourceComments(docId: $id, limit: $limit, offset: $offset) {
      comment
      createdAt
      id
      rating
      specialties
      subjects
      title
      usedInTests
      username
      replies {
        comment
        username
      }
    }
  }
`;

export const GET_RESOURCE_PERCENTAGE = gql`
  query GetResourcePercentage($resourceId: String!) {
    resourceUsePercent(resourceId: $resourceId) {
      percentage
    }
  }
`;

export const GET_HELPFUL_REVIEWS = gql`
  query GetHelpfulReviews($resourceId: String!, $userId: String!) {
    helpful_review(
      where: { resource_id: { _eq: $resourceId }, user_id: { _eq: $userId } }
    ) {
      resource_review_id
    }
  }
`;
