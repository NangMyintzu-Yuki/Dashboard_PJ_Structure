import React, {useState} from 'react'
import BranchForm from './../../pages/branch/BranchForm';
import { showErrorToast, showSuccessToast, showError } from './../../utils/commonFun';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { useNavigate } from 'react-router-dom';
import { TEXT } from './../../utils/text';

function CreateBranch() {
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem('operator_token')
  const navigate = useNavigate();
  const onAction = async(branch) =>{
    setLoading(false)
    try {
      const { data } = await post(ApiService.branch.create, branch, {}, token)
      console.log(data)
      if (data.status == "Success") {
        setLoading(false)
        navigate('/branch')
        showSuccessToast(data.message)
      } else if (data.message === "Failed"){
        console.log(data)
        showError(data)
      } else {
        showError(data)
        setLoading(false)
      }
    } catch (error) {
      showErrorToast(error.message)
    }
  }
  return (
    <BranchForm onAction={onAction} title={TEXT.create.branch} loading={loading} setLoading={setLoading} />
  )
}

export default CreateBranch
