import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'

import "../../Styles/OfferRide.css"

import { offerRide } from '../../HttpApi/OfferRideApi'
import { storeObj } from '../../Interfaces/IReduxStore'
import Header from '../../Components/Header'
import RideDetailsInput from '../../Components/RideDetailsInput'
import { logOutUser } from '../../Redux/Slices/UserDetailsSlice'
import { useIdleTimer } from 'react-idle-timer'
import { ToastContainer, toast } from 'react-toastify'


const OfferRide = () => {

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

    const [offerCardOneDisplay, setDisplay] = useState<boolean>(true)
    const [stopList, setStopList] = useState<{ value: string, plusButton: boolean }[]>([{ value: "", plusButton: false }, { value: "", plusButton: true }])
    const [source, setSource] = useState<number>(0)
    const [destination, setDestination] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("5am-9am")
    const [stops, setStops] = useState<string[]>([])
    const [seats, setSeats] = useState<number>(1)
    const [price, setPrice] = useState<number>(0)
    const [stopsWarning, setStopWarning] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(false);


    const jwtToken = useSelector((store: storeObj) => store.userDetails.jwtToken)
    const userId = useSelector((store: storeObj) => store.userDetails.userId)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateStops()) {
            const offerObject = {
                sourceId: source,
                destinationId: destination,
                date,
                time,
                userId,
                seats,
                price,
                Stops: stops
            }
            setLoader(true)
            offerRide(offerObject, jwtToken)
                .then(function (response) {
                    toast.success('Ride offered successful', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log(response)
                    setTimeout(() => navigate("/home"), 3000)
                })
                .catch(function (error) {
                    setLoader(false)
                    toast.error('Ride offered unsuccessful', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log(error);
                });
        }
    }

    const validateStops = () => {
        var set = new Set();
        stops.forEach(x => set.add(x.toLowerCase().trim()))
        if (stops.length !== set.size) {
            setStopWarning(x => "Stops cannot be duplicate!!")
            return false;
        }
        return true;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setStopWarning(null)
        const list: { value: string, plusButton: boolean }[] = stopList;
        list[index].value = e.target.value;
        setStopList((x) => [...list])
        const tempList: string[] = [];
        stopList.map((x) => { tempList.push(x.value) })
        setStops(tempList)
    }

    const handlePlus = (index: number) => {
        const list: { value: string, plusButton: boolean }[] = stopList;
        list[index].plusButton = false;
        list.push({ value: "", plusButton: true })
        setStopList([...list]);
    }

    const handleNext = (e: any) => {
        e.preventDefault();
        setDisplay(false)
    }

    const handleSource = (e: number) => setSource(e)
    const handleDestination = (e: number) => setDestination(e)
    const handleDate = (e: string) => setDate(e)
    const handleTime = (e: string) => setTime(e)

    const handleInputClick = () => {
        navigate("/bookRide")
    }

    return (
        <div className='contianer-fluid p-2 mainContainer'>
            <div className='row m-4 p-1'>
                <Header />
                <div className='col-12 '>
                    <div className='row ms-2'>
                        {<div className='col-4 offerCard'>
                            <form className=' p-3 pb-0' onSubmit={handleNext}>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='mb-0 fs-1 '>Offer a Ride</p>
                                        <p className='mb-4 title'>We get you the matches asap!</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" onClick={handleInputClick} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <RideDetailsInput source={source} destination={destination} date={date} time={time} setSource={handleSource} setDestination={handleDestination} setTime={handleTime} setDate={handleDate} />
                                <div className='d-flex pe-5'><button className='ms-auto mb-4 nextButton' >Next {'>'}{'>'}</button></div>
                            </form>
                        </div>}
                        {!offerCardOneDisplay && <div className='ms-5 col-4 offerCard'>
                            <form className=' p-3 pb-0' onSubmit={handleSubmit}>
                                <div className='d-flex fs-1  '><p className='mb-0'>Offer a Ride</p></div>
                                <p className='mb-5 title'>We get you the matches asap!</p>
                                <div className='stops'>
                                    <div className='d-flex'>
                                        <div className='stopsDiv'>
                                            {stopList.map((x, index) => {
                                                return (
                                                    <div key={index} >
                                                        <p className='title mb-0'>Stop {index + 1}</p>
                                                        <div className='stopDiv'>
                                                            <input required key={index} type='input' className="stopsInputField mb-3" value={stopList[index].value} onChange={(e) => { handleOnChange(e, index) }} />
                                                            {x.plusButton && <button className='plusButton' onClick={() => { handlePlus(index) }}>+</button>}
                                                        </div>
                                                    </div>)
                                            })}
                                        </div>
                                        <div className="iconsArea" >
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon startDotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                                            <div><MdLocationOn className='BooklocationIcon' /></div>
                                        </div>
                                    </div>
                                    {stopsWarning && <p className='text-danger fw-bold'>{stopsWarning}</p>}
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className='title '>Avaliable seats</p>
                                        <div className='radio-toolbar radio-toolbar-seats'>
                                            <input type="radio" id="1" name="seats" value="1" onClick={() => setSeats(1)} checked={seats == 1 ? true : false} />
                                            <label htmlFor='1'>1</label>
                                            <input type="radio" id="2" name="seats" value="2" onClick={() => setSeats(2)} />
                                            <label htmlFor='2'>2</label>
                                            <input type="radio" id="3" name="seats" value="3" onClick={() => setSeats(3)} />
                                            <label htmlFor='3'>3</label>
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <p className='title '>Price</p>
                                        <p className='fs-2 mb-0'> ₹<input type='number' className='priceInput' value={price ? price : ''} onChange={(e) => { setPrice(e.target.valueAsNumber) }} required /></p>
                                    </div>
                                </div>
                                {
                                    loader ? <div className="spinner-border mt-2 mb-3" role="status" >
                                    </div> : <>
                                        <button className='submitButton '>Submit</button></>
                                }
                            </form>
                        </div>}
                    </div>
                </div>
            </div>
            <ToastContainer hideProgressBar={true} pauseOnFocusLoss={false} autoClose={5000} />
        </div>
    )
}

export default OfferRide