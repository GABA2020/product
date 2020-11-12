import { gql } from '@apollo/client';

export const ADD_RESOURCE_TO_LOCKER = gql`
  mutation AddResourceToLocker($resource_id: String!, $user_id: String!) {
    insert_resources_locker_one(object: {resource_id: $resource_id, user_id: $user_id}){
      add_date
    }
  }
`

export const DELETE_FROM_LOCKER = gql`
  mutation AddResourceToLocker($resource_id: String!, $user_id: String!) {
    delete_resources_locker_by_pk(resource_id: $resource_id, user_id: $user_id){
      user_id
    }
  }
`

export const CREATE_PROGRAM = gql`
  mutation($createData: ProgramInput) {
    createProgram(createData: $createData)
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation MyMutation(
    $idDoc: String!,
    $updateData: ProgramInput
  ) {
      updateProgram(idDoc: $idDoc, updateData: $updateData)
  }
`

export const CREATE_RESOURCE = gql`
  mutation CreateResource($createData: ResourceInput) {
    createResource(createData: $createData)
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource(
    $idDoc: String!,
    $updateData: ResourceInput
  ) {
    updateResource(idDoc: $idDoc, updateData: $updateData)
  }
`