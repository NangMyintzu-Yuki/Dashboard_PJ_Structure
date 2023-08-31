import React from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
const Button = ({type,onAction, label}) => {
  return (
    <button className={`actionButton ${type}`} onClick={onAction}>
    {
        type == "create_new" && 
        <>
        <FaPlus size='10px' />
        &nbsp;&nbsp;
        </>
    }

    {
        type == "edit" && <FaEdit/>
    }
    {
        type == "delete" && <FaTrash />
    }
    {label}
    </button>
  )
}

export default Button
