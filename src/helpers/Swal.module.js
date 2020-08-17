import Swal from 'sweetalert2';
const colorYes = '#007bff';

const showWarningMessage = (message, title) => {
  const option = {
    title: title,
    icon: 'warning',
    text: message,
    type: 'warning',
    confirmButtonColor: colorYes,
    confirmButtonText: 'Yes',
  };
  Swal.fire(option);
};

const showConfirmMessage = (message, title, icon) => {
  const option = {
    title: title,
    icon: icon,
    text: message,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: colorYes,
    // cancelButtonColor: colorCancel,
    confirmButtonText: 'Yes',
  };
  return Swal.fire(option);
};

export { showConfirmMessage, showWarningMessage };
