import { toast } from "react-toastify";
const renderToast = (msg, type, setIsStop, isStop) => {
    
    const ToastObjects = {
      onOpen: props => {
        setIsStop(!props)
      },
      onClose: props => {
        setIsStop(props)
      },
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      autoClose: 2000,
    };

    toast[type](msg, ToastObjects)
  }
  export default renderToast;