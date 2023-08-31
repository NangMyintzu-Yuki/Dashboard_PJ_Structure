import React from 'react'
import { InputAdornment, TextField, IconButton } from '@mui/material'
import { FaSearch } from 'react-icons/fa'
const Search = ({label='Search'}) => {
  return (
    <TextField
      // fullWidth
      id="standard-bare"
      variant="outlined"
      size="small"
      label={label}
      sx={{ 
        "& .MuiOutlinedInput-root": { 
          "&:hover > fieldset": { 
            border: '1px solid var(--primary-color)',
          }, 
          "&:focus > fieldset": { 
            border: '1px solid var(--primary-color)',
          }, 
        }, 
        // "& .MuiInputLabel-outlined":{
        //   color:'red',
        // }
      }}

      InputProps={{
        endAdornment: (
          <IconButton 
            sx={{
              "&:hover": {
                backgroundColor: 'var(--second-color)'
              }
            }}>
            <FaSearch size="18px" fill="var(--primary-color)" />
          </IconButton>
        )
        
      }}
      // sx={{ border: '1px solid green', borderRadius: 1 }}
    />

  )
}

export default Search
