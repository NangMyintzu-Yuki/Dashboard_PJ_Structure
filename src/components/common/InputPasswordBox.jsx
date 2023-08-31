import React from 'react'
import { InputAdornment, TextField, IconButton } from '@mui/material'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
const InputPasswordBox = ({ value,label,onChange, error,color,type, showPassword, handleClickShowPassword }) => {
  return (
    <TextField

      color={color}
      type={type}
      fullWidth
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          paddingLeft: 0
        }
      }}
      
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              sx={{
                "&:hover": {
                  backgroundColor: 'var(--second-color)'
                }
              }}
            >
              {showPassword ? <FaEyeSlash size="20px" fill="var(--primary-color)" /> : <FaEye size="20px" fill="var(--primary-color)" />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off',
        },

      }}
    />
  )
}

export default InputPasswordBox
