import { storageAvatar, storageFB } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import { dataUrlFile } from 'helpers/Unity';

const getImageURL = async (payload: DTO.Storage.GetImageUrlRequest) => {
  // const url = await (await storageAvatar(payload.name)).getDownloadURL();
  const url = await storageFB.ref().child(payload.name).getDownloadURL();
  return url;
};
const uploadAvatar = async (payload: DTO.Storage.UploadAvatarRequest) => {
  const file: File = dataUrlFile(payload.content, payload.name);
  const avatarRef = await storageFB.ref(`avatar/${payload.name}`).put(file);
  const url = await avatarRef.ref.getDownloadURL();
  return { name: `avatar/${payload.name}`, url: url };
};
export { getImageURL, uploadAvatar };
