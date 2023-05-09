import { useState } from 'react'

import "../../Styles/BookRide.css"

import CardBookRide from '../../Components/CardBookRide'

import { getMatchedRides } from '../../HttpApi/OfferRideApi'

import { useDispatch, useSelector } from 'react-redux'
import { storeObj } from '../../Interfaces/IReduxStore'
import Header from '../../Components/Header'
import RideDetailsInput from '../../Components/RideDetailsInput'
import {  useNavigate } from 'react-router-dom'
import { logOutUser } from '../../Redux/Slices/UserDetailsSlice'
import { useIdleTimer } from 'react-idle-timer'

type matchedResults =
    {
        offerRideId: number,
        source: number,
        destination: number,
        date: string,
        time: string,
        userId: number,
        seats: number,
        price: number,
        seatsBooked: number,
        sourceName: string,
        destinationName: string,
        userName: string
    }



const BookRide = () => {

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

    const [source, setSource] = useState<number>(0)
    const [destination, setDestination] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("5am-9am")
    const [matches, setMatches] = useState<matchedResults[]>([])
    const [defaultResult, setDefaultResult] = useState<boolean>(false)

    const jwtToken = useSelector((store: storeObj) => store.userDetails.jwtToken)
    const userId = useSelector((store: storeObj) => store.userDetails.userId)

    const handleSource = (e: number) => setSource(e)
    const handleDestination = (e: number) => setDestination(e)
    const handleDate = (e: string) => setDate(e)
    const handleTime = (e: string) => setTime(e)

    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setDefaultResult(true)
        setMatches([])
        getMatchedRides({ source, destination, date, time }, jwtToken).then(response => {
            console.log(response)
            response.data.map((curr: any) => setMatches(prev => {
                if (curr.userId != userId) return [...prev, curr]
                else return [...prev]
            }))
        }).catch(error => console.log(error));
    }

    const handleInputClick = () => {
        navigate("/offerRide")
    }

    return (
        <div className='contianer-fluid p-2 mainContainer'>
            <div className='row m-4 p-1'>
                <Header />
                <div className='col-12'>
                    <div className='row ms-2'>
                        <div className='col-4 bookCard'>
                            <form className=' p-3' onSubmit={handleSubmit}>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='mb-0 fs-1 '>Book a Ride</p>
                                        <p className='mb-4 title'>We get you the matches asap!</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" onClick={handleInputClick} checked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <RideDetailsInput source={source} destination={destination} date={date} time={time} setSource={handleSource} setDestination={handleDestination} setTime={handleTime} setDate={handleDate} />
                                <button className='bookSubmitButton'>Submit</button>
                            </form>

                        </div>
                        <div className='col-8 mt-3'>
                            <div className='ms-5'>
                                <p className='matchesTitle'>Your Matches</p>
                                <div className='row  justify-content-between'>
                                    {
                                        matches.map((details, index) => {
                                            return (details.seats > details.seatsBooked && userId != details.userId)
                                                &&
                                                <CardBookRide
                                                    key={index} source={details.source} destination={details.destination} price={details.price} seats={details.seats} userId={details.userId} date={details.date} time={details.time} rideId={details.offerRideId} seatBooked={details.seatsBooked} sourceName={details.sourceName} destinationName={details.destinationName} userName={details.userName}
                                                />
                                        })
                                    }
                                    {
                                        matches.length == 0 && defaultResult &&
                                        <div><p>No Matches Found Search Again!!</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookRide