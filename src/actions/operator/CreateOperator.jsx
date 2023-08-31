
import React, {useState} from 'react'
import OperatorForm from './../../pages/operators/OperatorForm';
import { TEXT } from '../../utils/text.js'
import { useNavigate } from 'react-router-dom';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { showSuccessToast, showError, showErrorToast } from './../../utils/commonFun';

const CreateOperator = () => {
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem('operator_token')
  const navigate = useNavigate();
  const onAction = async (operator) => {
    setLoading(false)
    try {
      const { data } = await post(ApiService.operator.create, operator, {}, token)
      console.log(data)
      if (data.status == "Success") {
        setLoading(false)
        navigate('/operator')
        showSuccessToast(data.message)
      } else if (data.message === "Failed") {
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
    <OperatorForm title={TEXT.create.operator} loading={loading} setLoading ={setLoading} onAction={onAction} />
  )
}

export default CreateOperator
