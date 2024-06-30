import { ToastPosition, toast } from 'react-toastify';

const position: ToastPosition = 'bottom-right';

export const toastError = (text: string) => {
  toast.error(text, {
    position: position,
  });
};

export const toastSuccess = (text: string) => {
  toast.success(text, {
    position: position,
  });
};

export const toastWarning = (text: string) => {
  toast.warning(text, {
    position: position,
  });
};

export const toastInfo = (text: string) => {
  toast.info(text, {
    position: position,
  });
};
