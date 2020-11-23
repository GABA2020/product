import { gql } from '@apollo/client';

export const ADD_RESOURCE_TO_LOCKER = gql`
  mutation AddResourceToLocker($resource_id: String!, $user_id: String!) {
    insert_resources_locker_one(
      object: { resource_id: $resource_id, user_id: $user_id }
    ) {
      add_date
    }
  }
`;

export const DELETE_FROM_LOCKER = gql`
  mutation DeleteResourceFromLocker($resource_id: String!, $user_id: String!) {
    delete_resources_locker_by_pk(
      resource_id: $resource_id
      user_id: $user_id
    ) {
      user_id
    }
  }
`;

export const CREATE_PROGRAM = gql`
  mutation($createData: ProgramInput) {
    createProgram(createData: $createData)
  }
`;
export const CONNECT_TO_USER = gql`
  mutation($reciver_email: String!, $sender_email: String!) {
    connectUsers(reciver_email: $reciver_email, sender_email: $sender_email)
  }
`;
export const DISCONNECT_TO_USER = gql`
  mutation($reciver_email: String!, $sender_email: String!) {
    disconnectUsers(reciver_email: $reciver_email, sender_email: $sender_email)
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation MyMutation($idDoc: String!, $updateData: ProgramInput) {
    updateProgram(idDoc: $idDoc, updateData: $updateData)
  }
`;

export const CREATE_RESOURCE = gql`
  mutation CreateResource($createData: ResourceInput) {
    createResource(createData: $createData)
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($idDoc: String!, $updateData: ResourceInput) {
    updateResource(idDoc: $idDoc, updateData: $updateData)
  }
`;

export const UPDATE_USER_VALIDATION = gql`
  mutation UpdateUserValidation($email: String!) {
    update_user_account(
      where: { email: { _eq: $email } }
      _set: { verified: true }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $comment: String!
    $myRating: Int!
    $resourceId: String!
    $specialties: [String]!
    $subjects: [String]!
    $title: String!
    $usedInTests: [String]!
    $used_end: String!
    $used_start: String!
    $userId: String!
    $username: String
  ) {
    createReviewComment(
      reviewtData: {
        comment: $comment
        myRating: $myRating
        resourceId: $resourceId
        specialties: $specialties
        subjects: $subjects
        title: $title
        usedInTests: $usedInTests
        used_end: $used_end
        used_start: $used_start
        userId: $userId
        username: $username
      }
    ) {
      resource_review_id
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation ReplyComment(
    $comment: String!
    $commentId: String!
    $docId: String!
    $username: String!
  ) {
    replyResourceComment(
      replyData: {
        comment: $comment
        commentId: $commentId
        docId: $docId
        username: $username
      }
    )
  }
`;

export const ADD_HELPFUL_REVIEW = gql`
  mutation AddHelpfulReview(
    $resourceId: String!
    $commentId: String!
    $userId: String!
  ) {
    insert_helpful_review(
      objects: {
        resource_id: $resourceId
        resource_review_id: $commentId
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_HELPFUL_REVIEW = gql`
  mutation RemoveHelpfulReview($commentId: String!, $userId: String!) {
    delete_helpful_review(
      where: {
        resource_review_id: { _eq: $commentId }
        user_id: { _eq: $userId }
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_USER_PROFILE_FS = gql`
  mutation(
    $email: String!
    $name: String!
    $school_year: String!
    $degrees: [String!]
    $honors: [String!]
    $specialties: [String!]
    $avatar: String
  ) {
    editUserProfile(
      userProfileData: {
        email: $email
        name: $name
        school_year: $school_year
        degrees: $degrees
        honors: $honors
        specialties: $specialties
        avatar: $avatar
      }
    )
  }
`;

export const EDIT_USER_PROFILE_PG = gql`
  mutation(
    $email: String!
    $name: String!
    $last_name: String!
    $school_year: String!
    $medical_school: String!
  ) {
    update_user_account(
      where: { email: { _eq: $email } }
      _set: {
        last_name: $last_name
        name: $name
        school_year: $school_year
        medical_school: $medical_school
      }
    ) {
      affected_rows
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
    $degree_type: [String!]
    $honors: [String!]
    $majors: [String!]
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
    $degree_type: [String!]
    $honors: [String!]
    $majors: [String!]
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