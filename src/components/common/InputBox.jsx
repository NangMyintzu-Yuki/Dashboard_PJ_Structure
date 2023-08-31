import React from 'react'
import { TextField } from '@mui/material'
const InputBox = ({ label, value,color,type="text", error, errorMsg ,onChange}) => {
  return (
    <TextField
      error={error}
      fullWidth
      size={"small"}
      color={color}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      inputProps={{
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off',
        },
      }}
    />
  )
}

export default React.memo(InputBox)
