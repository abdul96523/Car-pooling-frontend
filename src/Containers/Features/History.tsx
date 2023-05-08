import { useEffect, useState } from 'react'

import BookHistory from '../../Components/BookHistory'
import OfferHistory from '../../Components/OfferHistory'

import "../../Styles/History.css"

import { IBookedRideObject } from '../../Interfaces/IBookRide'
import { IofferDetails } from '../../Interfaces/IOfferRide'
import { getBookRideDetials } from '../../HttpApi/BookRideApi'
import {  getOfferRideDetails } from '../../HttpApi/OfferRideApi'

import { useDispatch, useSelector } from 'react-redux'
import { storeObj } from '../../Interfaces/IReduxStore'

import Header from '../../Components/Header'
import { logOutUser } from '../../Redux/Slices/UserDetailsSlice'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'

const History = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onIdle = () => {
        console.log("userInactive")
        navigate("/")
        dispatch(logOutUser())
        setTimeout(() => { alert("Session Timeout Due To In-activity") }, 500)
    }
    useIdleTimer({
        onIdle,
        timeout: 100000,
        throttle: 500
    })

    const [bookedRides, setBookedRides] = useState<IBookedRideObject[]>([])
    const [offeredRides, setOfferedRides] = useState<IofferDetails[]>([])

    const jwtToken=useSelector((store:storeObj)=>store.userDetails.jwtToken)

    useEffect(()=>{ 
        const httpRequest=async()=>{
            await getBookRideDetials(jwtToken)
            .then(response=>{setBookedRides(response.data)})
            .catch(error=>console.log(error))
    
            await getOfferRideDetails(jwtToken)
            .then(response=>setOfferedRides(response.data))
            .catch(error=>console.log(error))
        }
        httpRequest();
    },[])

    return (
        <div className='contianer-fluid mainContainer'>
            <div className='row m-5 p-1'>
                <Header/>
                <div className='col-12 mt-5 historyArea'>
                    <div className='row'>
                        <div className="col-4">
                            <div className='d-inline-block bookRideOption ms-2'>Booked rides</div>
                            <div className='rideResultsArea'>
                            {
                                bookedRides.map((detials,index)=>{
                                    return <BookHistory key={index} data={detials} />
                                })
                            }
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className='d-inline-block offerRideOption ms-2'>Offered rides</div>
                            <div className='rideResultsArea'>
                            {
                                offeredRides.map((details,index)=>{
                                    return <OfferHistory key={index} data={details}/>
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History