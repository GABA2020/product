import { DTO } from 'types/DTO';
import { db } from 'helpers/firebase.module';
import { firestore } from 'firebase';
import moment from 'moment';

const getResourceDetail = async (
  payload: DTO.Locker.Resource.GetResourceDetailRequest,
) => {
  let resource: ENTITIES.Resource = {
    id: '',
    name: '',
    picture_name: '',
    rating: 0,
    link: '',
  };

  const resourcesCollection = await db
    .collection('resources')
    .doc(payload.id)
    .get();

  resource = {
    id: payload.id,
    ...resourcesCollection.data(),
  } as ENTITIES.Resource;
  return {
    id: payload.id,
    resource,
  };
};

const getResourcesWithConditionName = (name: string) => {
  if (name !== '') {
    return db.collection('resources').where('name', '>=', name).get();
  }
  return db.collection('resources').get();
};

export { getResourceDetail, getResourcesWithConditionName };
