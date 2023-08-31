import React, {useState} from 'react'
import InputWithIcon from './../../../components/common/InputWithIcon';
import { Box,Grid } from '@mui/material'
import LOGO from '../../../images/logo.png'
import { TEXT } from './../../../utils/text';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa'
import * as yup from 'yup';
import { post } from './../../../utils/api';
import { ApiService } from './../../../data/apiList';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from './../../../utils/commonFun';
import { ToastContainer } from 'react-toastify';
import InputPasswordBoxWithIcon  from '../../../components/common/InputPasswordBoxWithIcon'
const initialState = {
  username: '',
  password: '',
}

let schema = yup.object().shape({
  username: yup.string().required(TEXT.required.username),
  password : yup.string().required(TEXT.required.password)
});



const Login = () => {
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword) 

  const handleSubmit = async () =>{
    console.log(loginData)
    try {
      const value = await schema.validate(loginData,{ abortEarly: false})
      const {data} = await post(ApiService.auth.operator.login,loginData, {})
      console.log("login data",data.code)
      if(data.code == 200){
        showSuccessToast(data.message)
        localStorage.setItem('operator_token',data.data.token)
        localStorage.setItem('operator_loginInfo', JSON.stringify(data.data.loginInfo))
        setTimeout(() => navigate('/'), 1000)
      }else{
        showErrorToast(data.message)
      }

    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="login-container">
      <ToastContainer hideProgressBar theme='colored' />

      <div>
        <div className="logo">
        
          <img src={LOGO} alt="" width="100" height="100" />
          <br/>
          <br/>
        
        </div>
      <Box className="loginCard">
        <Grid container spacing={2} columns={1} sx={{ display: 'flex', justifyContent: 'center', px: 5, py:3 }}>
        <h2>LOGIN</h2>
          
            <Grid item xs={12} >
            <InputWithIcon
              label="Username"
              value={loginData.username}
              error={errors.includes(TEXT.required.username)}
              errorMsg={errors.includes(TEXT.required.username) ? TEXT.required.username : ''}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
                icon={<FaUser fill="var(--light-color)" />}
            />
          </Grid>
            <Grid item xs={12} sx={{ mb: 2 }} >
    
          <InputPasswordBoxWithIcon
          label={TEXT.label.password}
          error={errors.includes(TEXT.required.password)}
          errorMsg={
                errors.includes(TEXT.required.password) && TEXT.required.password}
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              type={showPassword ? "text" : "password"}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            {/**
              <ActionButton name={"Log In"} onAction={checkValidation} type={'update'} />
            */}
            <button className="loginBtn" type="button" onClick={handleSubmit}>LOGIN</button>
          </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'column',width:'100%', pt:2 }}>
              <div className="register">
              <span>
              Register 
              </span>
                <FaLongArrowAltRight style={{ paddingLeft: '5px', marginTop: '3px' }} size={16} />
              </div>
             
              <div className="forgotPassword"> 
              <FaLongArrowAltLeft/>Forgot your password?
              </div>
          
        </Grid>
        </Grid>
      </Box>
      </div>

      <div style={{ width: '500px', height: '500px' }}></div>
    </div>
  )
}

export default Login
