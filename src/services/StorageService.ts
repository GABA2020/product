import { storageAvatar } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

export const getImageURL = async (payload: DTO.Storage.GetAvatarUrlRequest) => {
  const url = await (await storageAvatar(payload.name)).getDownloadURL();
  return url;
};
