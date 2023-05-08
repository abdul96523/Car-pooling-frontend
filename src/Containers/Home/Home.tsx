import "../../Styles/Home.css"

import { storeObj } from '../../Interfaces/IReduxStore'

import { Link,useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'

import Header from '../../Components/Header'

import { useIdleTimer } from 'react-idle-timer'
import { logOutUser } from "../../Redux/Slices/UserDetailsSlice"


const  Home= () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    
    const userName=useSelector((store:storeObj)=>{return store.userDetails.userName})

    const onIdle = () => {
        console.log("userInactive")
        navigate("/")
        dispatch(logOutUser())
        setTimeout(()=>{alert("Session Timeout Due To In-activity")},500)
    }
    useIdleTimer({
        onIdle,
        timeout: 100000,
        throttle: 500
      })



    return (
    <div className='contianer-fluid homeContainer'>
        <div className='row m-4 p-3'>
            <Header/>
            <div className='col-6 m-auto'>
                    <p className='fw-bold fs-4 text-capitalize'>Hey {userName} !</p>
                    <div className='row'>
                        <div className='col-6'><button className='selectionButton' style={{backgroundColor:"rgba(147,25,255,255)"}} onClick={()=>navigate("/bookride")}><Link to={"/bookride"} className='link'>Book a ride</Link></button></div>
                        <div className='col-6'><button className='selectionButton' style={{backgroundColor:"rgba(255,172,25,255)"}} onClick={()=>navigate("/offerride")}><Link to={"/offerride"} className='link'>Offer a ride</Link></button></div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Home