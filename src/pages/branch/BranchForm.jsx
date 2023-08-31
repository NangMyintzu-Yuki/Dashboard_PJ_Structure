import React, {useState,useEffect} from 'react'
import { Box, Grid, FormControlLabel,Switch, InputLabel} from '@mui/material'
import InputBox from './../../components/common/InputBox';
import { TEXT } from './../../utils/text';
import Button from './../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import SwitchToggle from './../../components/common/SwitchToggle';
import * as yup from 'yup'
import { showErrorToast, showValidationErrors } from './../../utils/commonFun';
import { ToastContainer } from 'react-toastify';
import { post } from './../../utils/api';
import { useParams } from 'react-router-dom';
import { ApiService } from './../../data/apiList';
import Spinner from './../../components/common/Spinner';

const initialState = {
  name:'',
  status: 1
}
const BranchForm = ({ onAction ,title,loading,setLoading ,branchData = initialState}) => {
  const [branch,setBranch] = useState(branchData)
  const [errors,setErrors] = useState([])
  const [isEdit, setIsEdit] = useState(title === TEXT.create.branch ? false : true)
  const navigate = useNavigate();
  const { branchId } = useParams();

  let schema = yup.object().shape({
    name: yup.string().required(TEXT.required.name),
    status : yup.number().integer().required(TEXT.required.status)
  })
  const token = localStorage.getItem('operator_token')

  useEffect(() =>{
    if (isEdit) {
      const getBranch = async () => {
        try {
          const { data } = await post(`${ApiService.branch.edit}`, { id: branchId }, {}, token)
          setBranch(data?.data);
        } catch (err) {
          showErrorToast(err.message)
        }
      }
      getBranch();
    }
  },[])
  const onSubmit = async() => {
    try {
      const value = await schema.validate(branch, { abortEarly: false })
      if (errors.length == 0 || errors == undefined) {
        onAction(branch)
      }else{
        showValidationErrors(errors)
      }
    } catch (error) {
      console.log(error.message)
        showErrorToast(error.message)
    }
  }
  const handleCancel = () =>{
    navigate('/branch')
  }
  return (
    <div className="form">
    {
      loading && <Spinner/>
    }
      <ToastContainer hideProgressBar theme='colored' />

      <Box sx={{ flexGrow: 1 }} display="flex" justifyContent={"center"}>
        <Grid container spacing={2} columns={1} sx={{ margin: "16px" }} maxWidth={500}>
        <Grid item xs={12} sx={{ textAlign:'center' }}>
          <h2 className="formTitle">{title}</h2>
        </Grid>

          {/* Tag Name */}
          <Grid item xs={12}>
            <InputBox
              label={TEXT.label.name}
              error={errors.includes(TEXT.required.name)}
              errorMsg={errors.includes(TEXT.required.name) ? TEXT.required.name : ''}
              value={branch.name}
              onChange={(e) => {
                setErrors(errors.filter((value) => value != TEXT.required.name))
                setBranch((prev) => ({ ...prev, name: e.target.value }))
              }
              }
            />
          </Grid>

          <Grid item xs={12}>
          <SwitchToggle
              label={TEXT.label.status}
              checked = {branch.status === 0 ? false : true}
              onChange={()=>{
                setBranch((prev)=> ({...prev, status: branch.stauts ? 0 : 1}))
              }}
          />
          </Grid>

         
          <br/>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button 
              label={isEdit ? TEXT.buttonLabel.update : TEXT.buttonLabel.create} 
              type={ isEdit? 'update' : 'create'} 
              onAction={onSubmit} 
              />
            <Button 
              label="Cancel" 
              type="cancel"
              onAction={handleCancel} 
              />
          </Grid>
          
        </Grid>
      </Box>
    </div>
  )
}

export default BranchForm
