import { ToastContainerProps } from 'react-toastify'

export const toastsProps: ToastContainerProps = {
  position: 'top-right',
  autoClose: 3000,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  limit: 5,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
}
