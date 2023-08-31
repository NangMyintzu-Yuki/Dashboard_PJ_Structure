import React,{useState,useEffect} from 'react'
import * as yup from 'yup'
import Spinner from './../../components/common/Spinner';
import { ToastContainer } from 'react-toastify';
import { Box,Grid } from '@mui/material';
import InputBox from './../../components/common/InputBox';
import { TEXT } from '../../utils/text'
import SwitchToggle from './../../components/common/SwitchToggle';
import Button from './../../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import InputPasswordBox from './../../components/common/InputPasswordBox';
import SelectBox from './../../components/common/SelectBox';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { showErrorToast, showValidationErrors } from './../../utils/commonFun';

const initialState = {
    role : '',
    name : '',
    username : '',
    password : '',
    branch_id : '',
    status: 1,
}
const OperatorForm = ({loading,setLoading,title,operatorData=initialState,onAction}) => {
  const [operator,setOperator] = useState(operatorData);
  const [errors,setErrors] = useState([]);
  const [spinner,setSpinner] = useState(false)
  const [isEdit, setIsEdit] = useState(title == TEXT.create.operator ? false : true)
  const [branches,setBranches] = useState([])
  const [roles,setRoles] = useState([])
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate();
  const token = localStorage.getItem('operator_token');
  const loginInfo = JSON.parse(localStorage.getItem('operator_loginInfo'));
  console.log(loginInfo)
  const operatorId = useParams();

  let schema = yup.object({
    name : yup.string().required(TEXT.required.name),
    username : yup.string().required(TEXT.required.username),
    password: isEdit ? yup.string() : yup.string().required(TEXT.required.password),
    role : yup.number().integer().required(TEXT.required.role),
    branch_id : yup.number().integer().required(TEXT.required.branch),
    status: yup.number().integer().required(TEXT.required.status)
  })



 useEffect(()=>{
   if (isEdit) {
     const getOperator = async () => {
       try {
         const { data } = await post(`${ApiService.operator.edit}`, { id: operatorId }, {}, token)
         console.log("edit data", data)

         setOperator({ ...data.data, branch_id: data.data.branch_id.id, role: Number(data.data.role) });
         console.log(operator)
       } catch (err) {
         showErrorToast(err.message)
       }
     }
     getOperator();
   }
 },[])

  useEffect(()=>{
    

    const getRelatedDatas = async() =>{
        try {
          setSpinner(true)
          const branchDatas = await post(ApiService.branch.list,{}, token)
          const roleDatas = await post(ApiService.role.list,{},token)
          if (branchDatas.data.status === "Success" || roleDatas.data.stauts === 'Success'){
            setSpinner(false);
            setBranches(branchDatas.data.data.data)
            setRoles(roleDatas.data.data.data)
          }
          
        } catch (error) {
          showErrorToast(error.message)
          setSpinner(false);
        }
    }
    getRelatedDatas();
  }, [])

  const onSubmit = async() =>{
    try {
      const value = await schema.validate(operator, { abortEarly: false })
      console.log(value,errors);
      if (errors.length == 0 || errors == undefined) {
        onAction(operator)
      } else {
        showValidationErrors(errors)
      }
    } catch (error) {
      console.log(error.message)
      showErrorToast(error.message)
    }
  }
  const handleClickShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  const handleCancel = () =>{
    navigate('/operator')
  }
  const handleChangePassword = () =>{
    navigate('/operator/change_password')
  }
  return (
    <div className="form">
      {
        (spinner || loading) && <Spinner />
      }
      <ToastContainer hideProgressBar theme='colored' />

      <Box sx={{ flexGrow: 1 }} display="flex" justifyContent={"center"}>
        <Grid container spacing={2} columns={1} sx={{ margin: "16px" }} maxWidth={500}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <h2 className="formTitle">{title}</h2>
          </Grid>

          {/**Branch */}
          <Grid item xs={12}>
            <SelectBox
              label={TEXT.label.branch}
              error={errors.includes(TEXT.required.branch)}
              errorMsg={errors.includes(TEXT.required.branch) ? TEXT.required.branch : ''}
              values={branches}
              handleChange={(e) => {
                setErrors(errors.filter((value) => value != TEXT.required.branch))
                setOperator((prev) => ({ ...prev, branch_id: e.target.value }))
              }
            }
            value={operator.branch_id}
            />
          </Grid>

          {/**Role */}
          <Grid item xs={12}>
            <SelectBox
              label={TEXT.label.role}
              error={errors.includes(TEXT.required.role)}
              errorMsg={errors.includes(TEXT.required.role) ? TEXT.required.role : ''}
              value={operator.role}
              values={roles}
              handleChange={(e) => {
                setErrors(errors.filter((value) => value != TEXT.required.role))
                setOperator((prev) => ({ ...prev, role: e.target.value }))
              }
              }
            />
          </Grid>

          {/*Name */}
          <Grid item xs={12}>
            <InputBox
              label={TEXT.label.name}
              error={errors.includes(TEXT.required.name)}
              errorMsg={errors.includes(TEXT.required.name) ? TEXT.required.name : ''}
              value={operator.name}
              onChange={(e) => {
                setErrors(errors.filter((value) => value != TEXT.required.name))
                setOperator((prev) => ({ ...prev, name: e.target.value }))
              }
              }
            />
          </Grid>

          {/**Username */}
          <Grid item xs={12}>
            <InputBox
              label={TEXT.label.username}
              error={errors.includes(TEXT.required.username)}
              errorMsg={errors.includes(TEXT.required.username) ? TEXT.required.username : ''}
              value={operator.username}
              onChange={(e) => {
                setErrors(errors.filter((value) => value != TEXT.required.username))
                setOperator((prev) => ({ ...prev, username: e.target.value }))
              }
              }
            />
          </Grid>
          
          {/**Password */}
          {
            !isEdit && 
            <Grid item xs={12}>
              <InputPasswordBox
              type={showPassword ? "text" : "password"}
                label={TEXT.label.password}
                error={errors.includes(TEXT.required.password)}
                showPassword = {showPassword}
                handleClickShowPassword = {handleClickShowPassword}
                errorMsg={errors.includes(TEXT.required.password) ? TEXT.required.password : ''}
                value={operator.password}
                onChange={(e) => {
                  setErrors(errors.filter((value) => value != TEXT.required.password))
                  setOperator((prev) => ({ ...prev, password: e.target.value }))
                }
                }
              />
            </Grid>
          }


          {/**Status */}
          <Grid item xs={12}>
            <SwitchToggle
              label={TEXT.label.status}
              checked={operator.status === 0 ? false : true}
              onChange={() => {
                setOperator((prev) => ({ ...prev, status: operator.status ? 0 : 1 }))
              }}
            />
          </Grid>


          <br />
          
          <Grid container sx={{ my: (loginInfo || loginInfo?.role == 1) ? 4 : 0 }} maxWidth={500} display="flex" justifyContent="space-between">
          {
            (loginInfo || loginInfo?.role == 1 ) ? 
                <Grid sx={{ mx: "16px" }}>

                  <Button
                    label="Change Password"
                    type="change_password"
                    onAction={handleChangePassword}
                  />
                  
                </Grid>
            : 
            <Grid></Grid>
          }

          <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Button
              label={isEdit ? TEXT.buttonLabel.update : TEXT.buttonLabel.create}
              type={isEdit ? 'update' : 'create'}
              onAction={onSubmit}
            />
            <Button
              label="Cancel"
              type="cancel"
              onAction={handleCancel}
            />
          </Grid>
          </Grid>


        </Grid>
      </Box>
    </div>
  )
}

export default OperatorForm
