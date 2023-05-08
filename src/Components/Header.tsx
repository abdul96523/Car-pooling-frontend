import  { useState } from 'react'

import logo from "../Assets/logo.png"
import profilePic from "../Assets/user-profile.png"

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../Redux/Slices/UserDetailsSlice'
import { storeObj } from '../Interfaces/IReduxStore'
import { removeLocationsList } from '../Redux/Slices/locationSlice'

const Header = () => {
   const [display,setDisplay]=useState<boolean>(false)
   const dispatch=useDispatch()

   const userName=useSelector((store:storeObj)=>{return store.userDetails.userName})

    return (
        <div className='col-12 d-flex mb-3'>
            <img src={logo} className='logo' alt='logo'></img>
            <p className='ms-auto fs-4 fw-bold text-capitalize'>{userName} <img src={profilePic} className='userImage' onClick={() => setDisplay(!display)}></img>
                {display &&
                    <div className='menuBlock'>
                        <Link to={"/home"} onClick={()=>{setDisplay(x=>!x)}}>Profile</Link>
                        <Link to={"/history"} >My Rides</Link>
                        <Link to={"/"} onClick={()=>{dispatch(logOutUser()); }}>Logout</Link>
                     </div>
                }
            </p>
        </div>
    )
}

export default Header