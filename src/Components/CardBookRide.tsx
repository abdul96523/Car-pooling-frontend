import  { useEffect, useState } from 'react'

import userProfile from "../Assets/user-profile.png"
import "../Styles/BookRide.css"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {MdLocationOn} from 'react-icons/md'
import {GoPrimitiveDot} from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { bookRide } from '../HttpApi/BookRideApi';
import { IBookRideObject } from '../Interfaces/IBookRide';
import { storeObj } from '../Interfaces/IReduxStore';

type propType =
  {
    source: number,
    destination: number,
    price: number,
    seats: number,
    userId: number,
    date: string,
    time: string,
    rideId: number,
    seatBooked:number,
    sourceName:string,
    destinationName:string,
    userName:string,
  }

  const CardBookRide = ({ source, destination, price, seats, date, time, userId, rideId, seatBooked,sourceName,destinationName,userName }: propType) => {
  const [displayButton, setDisplayButton] = useState<boolean>(false)
  const [show, setShow] = useState(false);
  const [seatsSelected,setSeatsSelected]=useState<number>(1)
  const [minusStatus,setMinusStatus]=useState<boolean>(false)
  const [plusStatus,setPlusStatus]=useState<boolean>(false)
  const navigate=useNavigate();

  const jwtToken=useSelector((store:storeObj)=>store.userDetails.jwtToken)
  const loggedInUserId=useSelector((store:storeObj)=>store.userDetails.userId)
 

  const handleClose =async  () => {
    const bookedRideObject:IBookRideObject=
    {
      sourceId:source,
      destinationId:destination,
      date,
      time,
      bookedUserId:loggedInUserId,
      offerRideId:rideId,
      totalPrice:price*seatsSelected,
      seatsBooked:seatsSelected
    }
    await bookRide(bookedRideObject,jwtToken)
    .then(response=>{
      setShow(false)
      navigate('/home')
    })
    .catch(error=>{
      console.log(error)
    })
    // console.log(bookedRideObject)
  }


    
  useEffect(()=>{
    if(seatsSelected<=1)setMinusStatus(true)
    else setMinusStatus(false)
    if(seatsSelected>=seats-seatBooked)setPlusStatus(true)
    else setPlusStatus(false)
  },[seatsSelected])

  const handleBook = () => {
    setShow(true)
  }
  const handlePlus=()=>{
    setSeatsSelected(seats=>seats+1)
  }
  const handleMinus=()=>{
    setSeatsSelected(seats=>seats-1)
  }

  return (
    <div className='col-6 ps-4 pe-4 pb-4'>
      <div className='row p-2 BookDetialsCard' onClick={() =>{if(!displayButton)setDisplayButton(true)}} >
        <div className='d-flex'><p className='text-capitalize fs-2 fw-bold'>{userName}</p><img className='ms-auto BookedUser-Image' src={userProfile}></img></div>
        <p className='col-6 mb-0 cardTitle'>From</p>
        <p className='col-6 mb-0 cardTitle'>To</p>
        <div className="col-6 cardDetails d-flex mb-0">
            <div>{sourceName}</div>
            <div className='ms-auto'>
                <GoPrimitiveDot className='dotIcon'/>
                <GoPrimitiveDot className='interIcon'/>
                <GoPrimitiveDot className='interIcon'/>
                <GoPrimitiveDot className='interIcon'/>
                <GoPrimitiveDot className='interIcon'/>
                <MdLocationOn className='locationIcon'/>
            </div>
        </div>
        <p className="col-6 mb-1 fw-bold">{destinationName}</p>
        <p className="col-6 mb-0 cardTitle">Date</p>
        <p className="col-6 mb-0 cardTitle">Time</p>
        <p className="col-6 mb-1 fw-bold">{date.substring(0, 10)}</p>
        <p className="col-6 mb-1 fw-bold">{time}</p>
        <p className="col-6 mb-0 cardTitle">Price</p>
        <p className="col-6 mb-0 cardTitle">Seats Avaliable</p>
        <p className="col-6 mb-1 fw-bold">₹ {price}</p>
        <p className="col-6 mb-1 fw-bold">{seats-seatBooked}</p>
        {
          displayButton &&
            <div className='d-flex'>
              <p className='seatsValue'>Seats</p>
              <button className="btn btn-primary ms-2 me-2" onClick={handleMinus} disabled={minusStatus}>-</button>
              <p className='seatsValue'>{seatsSelected}</p>
              <button className="btn btn-primary ms-2 me-2" onClick={handlePlus} disabled={plusStatus}>+</button>
              <button className='btn btn-primary w-25 ms-auto bookButton' onClick={handleBook} >Book</button>
              <button className='btn btn-secondary fw-bold ms-4 bookButton' onClick={()=>{setDisplayButton(!displayButton);setSeatsSelected(1)}}>Close</button>
            </div>
        }
        <Modal show={show} >
          <Modal.Header >
            <Modal.Title>Congratulations !!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your ride has been booked successfully from {sourceName} to {destinationName} .</Modal.Body>
          <Modal.Footer className='m-auto'>
            <Button variant="success" onClick={handleClose}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default CardBookRide