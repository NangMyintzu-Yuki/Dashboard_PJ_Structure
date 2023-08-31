import React, { useState } from 'react'
import LOGO from '../../images/logo_white.png'
import { FaUser } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { HiMenu } from 'react-icons/hi'
import { BiLogIn } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import '../css/header.css'

const Header = ({ expandNav, toggleNav }) => {

  const loginInfo = JSON.parse(localStorage.getItem('operator_loginInfo'))
  console.log(loginInfo)
  const navigate = useNavigate();

  let operator = {
    name: 'Zuly'
  }

  const handleClick = () =>{
    navigate('/login')
  }

  return (
    <div className="adminDashboardHeaderBar">
      <div className="headerSideBar" style={{ width: expandNav ? '290px' : '70px', height: '60px' }}>
        <div className="logo" >
          <img src={LOGO} alt="" width={expandNav ? "50px" : " 30px"} />
        </div>
        {
          // expandNav &&
          // <h3 className="text">Dashboard</h3>
        }
        <button className='headerNavigationButton' onClick={toggleNav} style={{ transition: '2s ease-in-out', justifyContent: 'center' }}>
          <HiMenu size={30} style={{ border: 'none' }} fill="#ffffff" />
        </button>
      </div>
      <div className="adminDashboardHeaderBarLeft">
        <div></div>
        <h1 className='logoText'>Zuly POS</h1>

        {
          loginInfo ? 
            <div className='userInfo'>
              <IoIosNotifications size="25px" />
              <FaUser size="18px" className="userIcon" />
              {loginInfo.name}
            </div>
            : 
            <div className='userInfo' onClick={handleClick}>
            <span>
                <BiLogIn size="18px" /> Login
            </span>
            </div>
        }
        
      </div>
    </div>
  )
}

export default Header
