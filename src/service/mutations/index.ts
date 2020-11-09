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