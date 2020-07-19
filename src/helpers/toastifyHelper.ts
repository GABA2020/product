import { toast } from 'react-toastify';

let message: string = '';
export const toastifySuccess = success => {
  if (typeof success === 'object' && success.message) {
    ({ message } = success);
  }
  if (message !== null && message !== 'undefined' && message !== '') {
    toast.success(message);
  }
};

export const toastifyError = error => {
  if (typeof error === 'object' && error.message) {
    ({ message } = error);
  }
  if (message !== null && message !== 'undefined' && message !== '') {
    if (!toast.isActive(2)) {
      toast.error(message, { toastId: 2, type: toast.TYPE.ERROR });
    }
  }
};

export const toastifyInfo = information => {
  if (typeof information === 'object' && information.message) {
    ({ message } = information);
  }
  if (message !== null && message !== 'undefined' && message !== '') {
    toast.info(message);
  }
};

export const toastifyWarning = warning => {
  if (typeof warning === 'object' && warning.message) {
    ({ message } = warning);
  }
  if (message !== null && message !== 'undefined' && message !== '') {
    toast.warn(message);
  }
};
