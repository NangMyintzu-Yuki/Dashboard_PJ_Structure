import React from 'react'
import { InputLabel, FormControlLabel,Switch} from '@mui/material'
const SwitchToggle = ({label,checked,onChange}) => {
  return (
    <>
    {/**
    <InputLabel id="type">
    {label}
    </InputLabel>
  */}
      <FormControlLabel
        label={label}
        control={
          <Switch
            checked={checked}
            onChange={onChange}
          />
        }
      />
    </>
  )
}

export default SwitchToggle
