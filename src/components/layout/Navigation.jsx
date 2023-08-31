import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiSolidDollarCircle } from 'react-icons/bi'
import { FaHeadset, FaUser, FaCodeBranch,FaUserCog } from 'react-icons/fa'
import { RiFolderSettingsFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFillBoxFill } from "react-icons/bs";
import { SiSecurityscorecard } from "react-icons/si";
import { MdPayments, MdTableRestaurant, MdPointOfSale } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import { TbAdjustmentsDollar, TbQrcode, TbInfoOctagonFilled } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import Tooltip from "@mui/material/Tooltip"
import '../css/navigation.css'
const Navigation = ({expandNav, setExpandNav}) => {
  const navMenuList = [
    {
      icon: <AiFillHome size="20" />,
      name : "Home",
      route : "/"
    },
    {
      icon: <FaUser size="20" />,
      name: "User",
      route: 'user'
    },
    {
      icon: <MdPointOfSale size="20" />,
      name: "Point Of Sale",
      child : [
        {
          icon: <BiSolidDollarCircle size="20" />,
          name: "Sale",
          route: "sale"
        },
        {
          icon: <TbAdjustmentsDollar size="18" />,
          name: "Transaction",
          route: "transaction"
        },
      ]
    },
    
    {
      icon: <RiFolderSettingsFill size="18" />,
      name : "Setup",
      child : [
        {
          icon: <FaCodeBranch size="18" />,
          name: "Branch",
          route: "branch"
        },
        {
          icon: <BiSolidCategoryAlt size="18" />,
          name: "Cateogry",
          route: 'category'
        },
        {
          icon: <GiCook size="18" />,
          name: "Kitchen",
          route: 'kitchen'
        },
        {
          icon: <FaUserCog size="18" />,
          name: "Operator",
          route: 'operator'
        },
        {
          icon: <MdPayments size="18" />,
          name: "Payment Type",
          route: 'payment_type'
        },
        {
          icon: <BsFillBoxFill size="16" />,
          name: "Product",
          route: 'product'
        },
        {
          icon: <MdTableRestaurant size="18" />,
          name: "Table",
          route: 'table'
        },
      ]
    },
    {
      icon: <AiFillSetting size="19" />,
      name: "Setting",
      child: [
        {
          icon: <TbInfoOctagonFilled size="18" />,
          name: "About Us",
          route: "about_us"
        },
        {
          icon: <FaHeadset size="18" />,
          name: "Contact Us",
          route: "contact_us"
        },
        {
          icon: <TbQrcode size="18" />,
          name: "QR Code",
          route: 'qr_code'
        },
        {
          icon: <AiFillSetting size="16" />,
          name: "Site Setting",
          route: 'site_setting'
        },
      ]
    },
    
    {
      icon: <SiSecurityscorecard size="20"/>,
      name : "Role",
      route : 'role'
    },
  ]
  return (
    <div className="dashoardNavList" style={{ width:expandNav ? '240px' : '70px' }}>
      <nav className="nav">
        <ul>
        {
            navMenuList.map((menu, index) => <MenuItem expandNav={expandNav} key={index} menuInfo={menu} />)
        }
        </ul>
      </nav>
    </div>
  )
}

const MenuItem = ({menuInfo, expandNav}) =>{
  const [isOpen , setIsOpen] = useState(false)
  const menuClassName = "adminNavItem"
  const expandMenuClass = "adminNavItemExpand"
  const activeClassName = "adminNavItem active"
  const expandActive = "adminNavItemExpand active"
  const expandMainMenu = "adminMainMenuItemExpand"
  const mainMenu = "adminMainMenu"
  const openChildMenu = () =>{
    console.log("isOpen",isOpen)
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <div className="adminMenuItem">
      <Tooltip title={!expandNav && menuInfo.name} placement={"right"}>
        <div onClick={openChildMenu}>
          <NavLink 
            to={menuInfo.route} 
            className={({isActive}) => 
            isActive ? 
                expandNav ? menuInfo?.child ? expandMainMenu : expandActive : activeClassName 
            : 
                expandNav ? menuInfo?.child ? mainMenu : expandMenuClass 
            : menuClassName
          }
            >
              <div className={window.location.pathname.includes(`${menuInfo.route}`) ? "navigationMenu active" : menuInfo?.child ? "navigationMenu mainMenu" : "navigationMenu" } >
              {
                !expandNav ? 
                  menuInfo.icon : 
                  <>
                  <span className="navItemIcon">
                    {menuInfo.icon} 
                  </span>
                  &nbsp;&nbsp;&nbsp; 
                      <span className={expandNav ? "expandParentMenu" : ''}>
                        {menuInfo.name} 
                        {
                          menuInfo?.child &&
                          <span style={{ paddingTop: '7px', paddingRight:'7px' }}>
                            {
                                isOpen ? <IoIosArrowDown size="15px" /> : <IoIosArrowForward size="15px" />
                            }
                          </span>
                        }
                  </span>
                  </>
              }
              
              
            </div>
          
          </NavLink>
        
        </div>

      </Tooltip>
      
      </div>
            {

        (isOpen && menuInfo?.child) && menuInfo.child.map((child, index) =>
          <ChildMenuItem expandNav={expandNav} key={index} menuInfo={child} isOpen={isOpen} />
        )

      }
    </div>
  )
}


const ChildMenuItem = ({ menuInfo, expandNav, isOpen }) => {
  const menuClassName = "adminNavItemChild"
  const expandMenuClass = "adminNavItemExpandChild"
  const activeClassName = "adminNavItemChild active"
  const expandActive = "adminNavItemExpandChild active"
  

  return (
    <>
      <div className="adminChildMenuItem">
        <Tooltip title={!expandNav && menuInfo.name} placement={'right'}>
          <div>
            {
              isOpen &&
              <NavLink to={menuInfo.route} className={({ isActive }) => isActive ?
                expandNav ? expandActive : activeClassName : expandNav ? expandMenuClass
                  : menuClassName }>
                  <div className={window.location.pathname.includes(`/${menuInfo.route}`) ? "childNavigationMenu active" : "childNavigationMenu"}>
                  {
                    !expandNav ? menuInfo.icon : 
                    <>
                      <span className="childNavItemIcon">
                        {menuInfo.icon}
                      </span>
                    &nbsp;&nbsp;&nbsp;
                    {menuInfo.name} 
                    </>
                  }
                  
                </div>
              </NavLink>
            }
          </div>
        </Tooltip >
      </div>
    </>
  )
}

export default Navigation
