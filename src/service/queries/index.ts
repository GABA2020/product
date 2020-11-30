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
  query($email: String, $username: String) {
    user_account(where: {_or: [{email: {_eq: $email}},{username: {_eq: $username}}]}) {
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
      medical_school
      name
      school_year
      step_1
      specialties
      step_2
      step_3
      student_status
      username
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
        is_present_date
      }
      researchs {
        id
        author
        email
        event_date
        event_name
        journal
        link
        primary_investigator
        show_link
        research_type
        work_title
        city
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

export const ADD_USER_SUBCOLLECTION = gql`
  mutation(
    $email: String!
    $subcollectionName: SubcollectionName!
    $city: String
    $company: String
    $description: String
    $end_date: String
    $start_date: String
    $title: String
    $author: String
    $event_date: String
    $event_name: String
    $journal: String
    $link: String
    $primary_investigator: String
    $research_type: String
    $show_link: Boolean
    $work_title: String
    $job_title: String
    $nbr_hours_served: Int
    $organization_name: String
    $degree_type: String
    $honors: String
    $majors: String
    $school: String
    $is_present_date: Boolean
    $document_name: String
    $document_type: String
    $receive_date: String
  ) {
    addUserSubCollection(
      email: $email
      subcollectionName: $subcollectionName
      createSCData: {
        title: $title
        company: $company
        city: $city
        start_date: $start_date
        end_date: $end_date
        description: $description
        author: $author
        event_date: $event_date
        event_name: $event_name
        journal: $journal
        link: $link
        primary_investigator: $primary_investigator
        research_type: $research_type
        show_link: $show_link
        work_title: $work_title
        job_title: $job_title
        nbr_hours_served: $nbr_hours_served
        organization_name: $organization_name
        degree_type: $degree_type
        honors: $honors
        majors: $majors
        school: $school
        is_present_date: $is_present_date
        document_name: $document_name
        document_type: $document_type
        receive_date: $receive_date
      }
    ) {
      id
      error
    }
  }
`;

export const EDIT_USER_SUBCOLLECTION = gql`
  mutation(
    $email: String!
    $subcollectionName: SubcollectionName!
    $subcollectionId: String!
    $city: String
    $company: String
    $description: String
    $end_date: String
    $start_date: String
    $title: String
    $author: String
    $event_date: String
    $event_name: String
    $journal: String
    $link: String
    $primary_investigator: String
    $research_type: String
    $show_link: Boolean
    $work_title: String
    $job_title: String
    $nbr_hours_served: Int
    $organization_name: String
    $degree_type: String
    $honors: String
    $majors: String
    $school: String
    $is_present_date: Boolean
    $document_name: String
    $document_type: String
    $receive_date: String
  ) {
    editUserSubCollection(
      email: $email
      subcollectionName: $subcollectionName
      subcollectionId: $subcollectionId
      updateSCData: {
        title: $title
        company: $company
        city: $city
        start_date: $start_date
        end_date: $end_date
        description: $description
        event_date: $event_date
        author: $author
        event_name: $event_name
        journal: $journal
        link: $link
        primary_investigator: $primary_investigator
        research_type: $research_type
        show_link: $show_link
        work_title: $work_title
        job_title: $job_title
        nbr_hours_served: $nbr_hours_served
        organization_name: $organization_name
        degree_type: $degree_type
        honors: $honors
        majors: $majors
        school: $school
        is_present_date: $is_present_date
        document_name: $document_name
        document_type: $document_type
        receive_date: $receive_date
      }
    )
  }
`;

export const DELETE_USER_SUBCOLLECTION = gql`
  mutation(
    $email: String!
    $subcollectionName: SubcollectionName!
    $subcollectionId: String!
  ) {
    deleteUserSubcollection(
      email: $email
      subcollectionName: $subcollectionName
      subcollectionId: $subcollectionId
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
      medical_school
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
export const USERS_QUERY_PG = gql`
  query UsersPG {
    user_account {
      username
      verified
      email
      FSdata {
        name
        step_1
        step_2
        step_3
        mcat
        medical_school
        school_year
        specialties
        degrees
      }
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

export const GET_SPECIALITIES = gql`
  query GetSpecialities {
    medical_specialties {
      specialties_name
      id
    }
  }
`;
export const GET_REVIEWS_BY_USER = gql`
  query GetReviewsByUser($userId: String!) {
    users_reviews(where: { user_id: { _eq: $userId } }) {
      resource_id
      userReviewResource {
        name
        picture_name
      }
      ReviewComment {
        title
        comment
        rating
      }
    }
  }
`;
export const GET_LOCKER_RESOURCES_BY_USER = gql`
  query GetLockerResourceByUser($userId: String!) {
    resources_locker(where: { user_id: { _eq: $userId } }) {
      resource_id
      resource_locker {
        picture_name
        name
        rating
      }
    }
  }
`;

export const GET_SCHOOLS = gql`
  query GetSchools {
    school_programs {
      school_name
    }
  }
`;

export const EMAIL_USERNAME_VERIFICATION = gql`
  query($email: String!, $username: String!) {
    user_account(
      where: {
        _or: [{ email: { _eq: $email } }, { username: { _eq: $username } }]
      }
    ) {
      uid
    }
  }
`;
export const GET_DISCIPLINES = gql`
  query GetDisciplines {
    medical_diciplines {
      dicipline_name
    }
  }
`;
