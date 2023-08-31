

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export const showSuccessToast = (message) => {
  toast.success(message)
}
export const showErrorToast = (message) => {
  toast.error(message);
}
export const showWarningToast = (message) => {
  toast.warning(message);
}

export const showValidationErrors = (errors) => {
  errors?.length > 0 && errors.map((err) => {
    toast.error(err, { autoClose: 7000 });
  })
}


export const DeleteRow = (dataArr, id) =>{
  const index = dataArr.findIndex((element)=> element.id === id);
  const modifiedArr = dataArr.filter((element) => element !== dataArr[index]);
  return modifiedArr
}
export const showError = (data) =>{
  console.log(data)
  let errMsg = (data?.message?.name && data?.message?.name[0]) || 
              (data?.message?.title && data?.message?.title[0]) || 
              (data?.message?.phone && data?.message?.phone[0])
    ||        (data?.message?.email && data?.message?.email[0]) || 
              (data?.message?.id && data?.message?.id[0]) ||
              (data?.errors?.name && data?.errors?.name[0])
  toast.error(errMsg)
}
