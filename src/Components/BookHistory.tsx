import { useEffect, useState } from 'react'
import {MdLocationOn} from 'react-icons/md'
import {GoPrimitiveDot} from 'react-icons/go'

import userProfile from "../Assets/user-profile.png"
import "../Styles/History.css"


import { IBookedRideObject } from '../Interfaces/IBookRide'


type propType ={
    data :IBookedRideObject,
  }
    
const BookHistory = ({ data}:propType) => {
 
  return (
    <div className='ps-4 pe-4 pb-4'>
        <div className='row p-2 DetialsCard '>
            <div className='d-flex'><p className='userName text-capitalize'>{data.offeredUserName}</p><img className='ms-auto user-Image' src={userProfile}></img></div>
            <p className='col-6 mb-0 cardTitle'>From</p>
            <p className='col-6 mb-0 cardTitle'>To</p>
            <div className="col-6 cardDetails d-flex mb-0">
              <div>{data.sourceName}</div>
              <div className='ms-auto text-nowrap'>
                  <GoPrimitiveDot className='dotIcon'/>
                  <GoPrimitiveDot className='interIcon'/>
                  <GoPrimitiveDot className='interIcon'/>
                  <GoPrimitiveDot className='interIcon'/>
                  <GoPrimitiveDot className='interIcon'/>
                  <MdLocationOn className='locationIcon'/>
                </div>
            </div>
            <p className="col-6 mb-0 cardDetails">{data.destinationName}</p>
            <p className="col-6 mb-0 cardTitle">Date</p>
            <p className="col-6 mb-0 cardTitle">Time</p>
            <p className="col-6 mb-2 cardDetails">{data.date.substring(0,10)}</p>
            <p className="col-6 mb-2 cardDetails">{data.time}</p>
            <p className="col-6 mb-0 cardTitle">Price</p>
            <p className="col-6 mb-0 cardTitle">Seats</p>
            <p className="col-6 mb-0 cardDetails">₹ {data.price}</p>
            <p className="col-6 mb-0 cardDetails">{data.seats}</p>
        </div>
    </div>
  )
}

export default BookHistory