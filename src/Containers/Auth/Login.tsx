import {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserId, setJwt, setUserName } from '../../Redux/Slices/UserDetailsSlice'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../Styles/Security.css"

import logo from '../../Assets/logo.png'
import home from '../../Assets/homebg.png'
import form from '../../Assets/formbg.png'

import { logIn } from '../../HttpApi/AuthenticationApi'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [mail, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [credentialsWarning, setCredentialsWarning] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setCredentialsWarning(false)
        setLoader(true)
        const credentials = { mail,password }
        logIn(credentials)
            .then((response) => {
                dispatch(setJwt(response.data[0]))
                dispatch(setUserId(Number(response.data[1])))
                dispatch(setUserName(response.data[2]))
                navigate('/home')
            })
            .catch((error) => {
                console.log(error)
                if (error.message === "Network Error") {
                    toast.error('Network Error ', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                else if(error.message==="canceled")
                {
                    toast.warn('Request Timeout', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                else {
                    setCredentialsWarning(true)
                }
            })
            .finally(() => {
                setLoader(false)
            })
    }

   


    return (
        <>
            <div className='container-fluid parentContainer'>
                <div className='row mainRow'>
                    <div className='col-8 ps-5 pt-3' >
                        <div className="row">
                            <div className='row mb-4'>
                                <div><img src={logo} /></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-8 '>
                                <p className='text mb-0'>
                                    TURN <span className='yellowText'>MILES</span>
                                </p>
                                <p className='text mb-0 '>
                                    INTO <span className='blueText'>MONEY</span>
                                </p>
                                <p className='fw-bold fs-2 mb-0 ' style={{ letterSpacing: "0.4rem" }}>RIDES ON TAP</p>
                            </div>
                        </div>
                        <div className="row" >
                            <div className='col-12 position-absolute bottom-0' >
                                <img className='homeImage' src={home}></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 blueBackground'>
                        <div className='w-100 position-absolute bottom-0' style={{ zIndex: "1" }}><img className="formImage" src={form}></img></div>
                        <div className='d-flex position-absolute justify-content-center  w-100' style={{ zIndex: "2" }}>
                            <div className='formDetails w-75'>
                                <p className='fs-1 text-white fw-bold text-center'>Log In</p>
                                <p className='text-white'>
                                    {/* <hr className='w-25 m-auto' style={{ borderWidth: "3px", opacity: "100" }}></hr> */}
                                </p>
                                <form className='mt-5' onSubmit={handleSubmit}>
                                    <div className="mb-3 form-floating">
                                        <input type="email" placeholder='Enter mail Id' id="floatingInput" className="form-control" value={mail} onChange={(e) => { setEmail(e.target.value) }} required />
                                        <label htmlFor='floatingInput'>Enter Email Id</label>
                                    </div>
                                    <div className='mb-3 form-floating'>
                                        <input type="password" placeholder='Enter password' className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                        <label htmlFor='floatingInput'>Enter Password</label>
                                    </div>
                                    {credentialsWarning && <p className='text-white'>Invalid Credentials!!</p>}
                                    <div className='d-flex justify-content-center'>
                                        {
                                            loader ? <div className="spinner-border mt-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> : <>
                                                <button className='m-auto btn  fw-bold submitButton' style={{ backgroundColor: "rgba(255,172,25,255)" }} >Submit</button>
                                            </>
                                        }
                                    </div>
                                </form>
                                <div>
                                    <p className='text-center text-white mt-4 fs-6 mb-0 pb-0'>Not a member yet?<Link to="/signup" style={{ textDecoration: 'none' }} className='text-white text-decoration-none fs-5 fw-bold'> SIGN UP</Link> </p>
                                    {
                                        /* <hr className='text-white mt-0' style={{ width: "38px", borderWidth: "3px", opacity: "100", marginLeft: "60%" }}></hr> */
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer hideProgressBar={true} pauseOnFocusLoss={false} autoClose={5000} />
        </>
    )
}

export default Login

