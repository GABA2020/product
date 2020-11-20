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
    createProgram(reciver_email: $reciver_email, sender_email: $sender_email)
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
  mutation($email: String!, $name: String!) {
    update_user_account(
      where: { email: { _eq: "" } }
      _set: { last_name: "", name: "", school_year: "", medical_school: "" }
    ) {
      affected_rows
    }
  }
`;
