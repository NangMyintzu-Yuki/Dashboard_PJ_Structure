import React,{useState} from 'react'
import BranchForm from './../../pages/branch/BranchForm';
import { useNavigate } from 'react-router-dom';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { showSuccessToast, showError, showErrorToast } from './../../utils/commonFun';
import { TEXT } from './../../utils/text';

const UpdateBranch = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('operator_token');
  const onAction = async (branch) => {
    setLoading(true)
    try {
      const { data } = await post(ApiService.branch.update, branch, {}, token)
      console.log("data",data)
      if (data.status === 'Success') {
        showSuccessToast(data.message);
        navigate('/branch')
        setLoading(false)
      } else {
        showError(data)
        setLoading(false)
      }
    } catch (err) {
      showErrorToast(err.message)
    }
  }
  return (
    <BranchForm onAction={onAction} title={TEXT.edit.branch} loading={loading} setLoading={setLoading} />
  )
}

export default UpdateBranch
