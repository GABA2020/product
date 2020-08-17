import { storageAvatar, storageFB } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import { dataUrlFile } from 'helpers/Unity';

const getImageURL = async (payload: DTO.Storage.GetImageUrlRequest) => {
  const url = await storageFB.ref().child(payload.name).getDownloadURL();
  return url;
};

const uploadFile = async (payload: DTO.Storage.UploadFileRequest) => {
  const fileRef = await storageFB.ref(payload.name).put(payload.file);

  const url = await fileRef.ref.getDownloadURL();

  return { name: payload.name, url: url };
};

const getFileURL = async (payload: DTO.Storage.GetFileUrlRequest) => {
  const url = await storageFB.ref().child(payload.name).getDownloadURL();
  return { name: payload.name, url };
};
export { getImageURL, uploadFile, getFileURL };
