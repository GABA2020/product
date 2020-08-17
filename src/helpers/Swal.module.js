import Swal from 'sweetalert2';
// const colorCancel = colorCancel;

const optionDialogUploadImage = {
  title: 'Warring !',
  text:
    'Make sure you are uploading a file of .png / .jpg / .jpeg / .raw format!',
  type: 'info',
  confirmButtonColor: '#007bff',
  confirmButtonText: 'Yes',
};

const optionDialogSizeImage = {
  title: 'Warring !',
  text: 'You are uploading an image file larger than 5Mb!',
  type: 'warning',
  confirmButtonColor: '#007bff',
  confirmButtonText: 'Yes',
};

// const optionDialogUpdateProfileConfirm = {
//   text: 'Are you sure want to update your profile?',
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#007bff',
//   cancelButtonColor: colorCancel,
//   confirmButtonText: 'Yes, update!',
// };

// const optionDialogUpdatePasswordConfirm = {
//   text: 'Are you sure want to update password?',
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#007bff',
//   cancelButtonColor: colorCancel,
//   confirmButtonText: 'Yes, update!',
// };

const optionDialogDelete = {
  title: 'Delete !',
  text: 'Are you sure you want to delete this?',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#0065f2',
  // cancelButtonColor: colorCancel,
  confirmButtonText: 'Yes',
};

export const showDialogResult = (title, message, type) => {
  Swal.fire(title, message, type);
};

export const showDialogUploadImage = () => Swal.fire(optionDialogUploadImage);

export const showDialogSizeImage = () => Swal.fire(optionDialogSizeImage);

// export const showDialogUpdateProfileConfirm = () =>
//   Swal.fire(optionDialogUpdateProfileConfirm);

// export const showDialogUpdatePasswordConfirm = () =>
//   Swal.fire(optionDialogUpdatePasswordConfirm);

export const showDialogDelete = () => Swal.fire(optionDialogDelete);
