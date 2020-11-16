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
  mutation AddResourceToLocker($resource_id: String!, $user_id: String!) {
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
    $comment: String!,
    $myRating: Int!,
    $resourceId: String!,
    $specialties: [String]!,
    $subjects: [String]!,
    $title: String!,
    $usedInTests: [String]!,
    $used_end: String!,
    $used_start: String!,
    $userId: String!
  ) {
    createReviewComment(reviewtData: {
      comment: $comment,
      myRating: $myRating,
      resourceId: $resourceId,
      specialties: $specialties,
      subjects: $subjects,
      title: $title,
      usedInTests: $usedInTests,
      used_end: $used_end,
      used_start: $used_start,
      userId: $userId
    }) {
      resource_review_id
    }
  }
`
