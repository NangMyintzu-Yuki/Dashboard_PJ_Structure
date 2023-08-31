import React from 'react'
import { FormControl,InputLabel,Select,MenuItem} from '@mui/material';
const SelectBox = ({ handleChange, value,values,label }) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        size="small"
        defaultValue=""
        value={value}
        label={label}
        onChange={handleChange}
      >
      {
        values.length > 0 && 
          values.map((data,index)=>{
            return <MenuItem value={data.id} key={index}>{data.name}</MenuItem>
          }
          )
      }
      </Select>
    </FormControl>
  )
}

export default SelectBox
