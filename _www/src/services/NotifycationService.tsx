import { ToastPosition, toast } from 'react-toastify';

const position: ToastPosition = 'bottom-right';

export const toastNotifycationError = (text: string) => {
  toast.error(text, {
    position: position,
  });
};

export const toastNotifycationSuccess = (text: string) => {
  toast.success(text, {
    position: position,
  });
};

export const toastNotifycationInfo = (text: string) => {
  toast.info(text, {
    position: position,
  });
};
