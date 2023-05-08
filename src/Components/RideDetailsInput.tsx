
import { useSelector } from 'react-redux'
import { storeObj } from '../Interfaces/IReduxStore'
import { GoPrimitiveDot } from 'react-icons/go'
import { MdLocationOn } from 'react-icons/md'

type propType=
{
    source:number,
    destination:number,
    date:string,
    time:string
    setSource:(e:number)=>void
    setDestination:(e:number)=>void
    setTime:(e:string)=>void    
    setDate:(e:string)=>void
}

const RideDetailsInput = ({source,destination,date,time,setSource,setDestination,setTime,setDate}:propType) => {
    const locations:{name:string,id:number}[]=useSelector((store:storeObj)=>{return store.locationsList})
    return (
        <div className='d-flex'>
            <div className='rideInputArea'>
                <p className='title mb-0 '>From</p>
                <select onChange={e => setSource(Number(e.target.value))} className='selectDropDown w-100' required>
                    {source == 0 ? <option value=''>Select source</option> : <></>}
                    {locations.filter(location => location.id !== destination).map((loc:{name:string,id:number}) => {
                        return <option key={loc.id} value={loc.id}>{loc.name}</option> })}
                </select>
                <p className='title mb-0 '>To</p>
                <select onChange={e => setDestination(Number(e.target.value))}  className='selectDropDown w-100' required>
                    {destination == 0 ? <option value=''>Select destination</option> : <></>}
                    {locations.filter(location => location.id !== source).map(loc => { return <option key={loc.id} value={loc.id}>{loc.name}</option> })}
                </select>
                <p className='title mb-0 '>Date</p>
                <input className='stopsInputField mb-3 w-100' type="date" required value={date} onChange={(e) => { setDate(e.target.value) }} min={new Date().toISOString().split('T')[0]}></input>
                <p className='title mb-0'>Time</p> 
                <div className='radio-toolbar'>
                    <input type="radio" id="5am-9am" name="time" value="5am-9am" onClick={() => setTime("5am-9am")}  checked={(time=='5am-9am')?true:false}/>
                    <label htmlFor='5am-9am'>5am-9am</label>
                    <input type="radio" id="9am-12pm" name="time" value="9am-12pm" onClick={() => setTime("9am-12pm")}  checked={(time=='9am-12pm')?true:false}/>
                    <label htmlFor='9am-12pm'>9am-12pm</label>
                    <input type="radio" id="12pm-3pm" name="time" value="12pm-3pm" onClick={() => setTime("12pm-3pm")}  checked={(time=='12pm-3pm')?true:false}/>
                    <label htmlFor='12pm-3pm'>12pm-3pm</label>
                </div>
                <div className='radio-toolbar'>
                    <input type="radio" id="3pm-6pm" name="time" value="3pm-6pm" onClick={() => setTime("3pm-6pm")}  checked={(time=='3pm-6pm')?true:false}/>
                    <label htmlFor='3pm-6pm'>3pm-6pm</label>
                    <input type="radio" id="6pm-9pm" name="time" value="6pm-9pm" onClick={() => setTime("6pm-9pm")}  checked={(time=='6pm-9pm')?true:false}/>
                    <label htmlFor='6pm-9pm'>6pm-9pm</label>
                </div>
            </div>
            <div className='iconsArea'>
                <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon startDotIcon' /></div>
                <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                <div className='interIconArea'><GoPrimitiveDot className='BookdotIcon' /></div>
                <div><MdLocationOn className='BooklocationIcon' /></div>
            </div>
        </div>
    )
}

export default RideDetailsInput