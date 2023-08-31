import React from 'react'
import { InputAdornment, TextField, IconButton } from '@mui/material'
import { FaEyeSlash,FaEye } from 'react-icons/fa'
import { BiSolidLock } from 'react-icons/bi'
function InputPasswordBoxWithIcon({value,onChange,error,type, showPassword, handleClickShowPassword,label }) {
  return (
    <TextField
      fullWidth
      error={error}
      value={value}
      // label={label}
      type={type}
      onChange={onChange}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          paddingLeft: 0
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            sx={{
              padding: "19px 12px 20px 12px",
              backgroundColor: "var(--primary-color)",
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
            }}
            position="start"
          >
            <BiSolidLock fill="var(--light-color)" />
          </InputAdornment>
        ),
        endAdornment:(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              sx={{ 
                "&:hover":{
                  backgroundColor:'var(--second-color)'
                }
               }}
            >
              {showPassword ? <FaEyeSlash size="20px" fill="var(--primary-color)" /> : <FaEye size="20px" fill="var(--primary-color)" />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default React.memo(InputPasswordBoxWithIcon)
