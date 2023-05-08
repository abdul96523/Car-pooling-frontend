import { Route, Routes } from 'react-router-dom'
import createActivityDetector from 'activity-detector';

import { useDispatch, useSelector } from 'react-redux'

import SignUp from './Containers/Auth/SignUp'
import Login from './Containers/Auth/Login'
import Home from './Containers/Home/Home'
import BookRide from "./Containers/Features/BookRide"
import OfferRide from "./Containers/Features/OfferRide"
import History from "./Containers/Features/History"
import { storeObj } from './Interfaces/IReduxStore'

import { getLocations } from "./HttpApi/LocationApi"
import { removeLocationsList, setLocationList } from './Redux/Slices/locationSlice'
import { useEffect } from 'react';


function App() {

    const userDetails = useSelector((state: storeObj) => state.userDetails)
    const dispatch=useDispatch();

    useEffect(() => {
        const setLocations=async()=>{
            const resposne=await getLocations()
            console.log(resposne)
            dispatch(setLocationList(resposne.data))
        }
        setLocations()
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<Login />} />
                {userDetails.userId !== 0 ? (
                    <>
                        <Route path='/home' element={<Home />} />
                        <Route path='/bookride' element={<BookRide />} />
                        <Route path='/offerride' element={<OfferRide />} />
                        <Route path='/history' element={<History />} />
                    </>) : <></>
                }
            </Routes>
        </div>
    )
}

export default App
