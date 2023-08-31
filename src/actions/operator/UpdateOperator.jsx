import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { showSuccessToast, showError, showErrorToast } from './../../utils/commonFun';
import { TEXT } from './../../utils/text';
import OperatorForm from './../../pages/operators/OperatorForm';

const UpdateOperator = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('operator_token');
  const onAction = async (operator) => {
    setLoading(true)
    try {
      const { data } = await post(ApiService.operator.update, operator, {}, token)
      console.log("data", data)
      if (data.status === 'Success') {
        showSuccessToast(data.message);
        navigate('/operator')
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
    <OperatorForm onAction={onAction} title={TEXT.edit.operator} loading={loading} setLoading={setLoading} />

  )
}

export default UpdateOperator
