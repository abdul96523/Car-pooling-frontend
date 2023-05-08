import { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'

import logo from '../../Assets/logo.png'
import home from '../../Assets/homebg.png'
import form from '../../Assets/formbg.png'

import "../../Styles/Security.css"

import { signUp } from '../../HttpApi/AuthenticationApi'

const SignUp = () => {

  const navigate=useNavigate()
  
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [emailWarning, setEmailWarning] = useState<boolean>(false)
  const [passwordWarning,setPasswordWarning]=useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setEmailWarning(false)
    setPasswordWarning(false)
    if(password===confirmPassword)
    {
      const credentials={
        mail:email,
        password
      }
      try{
        const response=await signUp(credentials)
        if(response.status==200)navigate("/")
      }
      catch(error:any)
      {
        console.log(error)
        setEmailWarning(true)
      }
    }
    else setPasswordWarning(true)
  }
    
  return (
  <>
      <div className='container-fluid parentContainer' >
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
          <div className='col-4 yellowBackground'>
            <div className='w-100 position-absolute bottom-0' style={{ zIndex: "1" }}><img className="formImage" src={form}></img></div>
            <div className='d-flex position-absolute justify-content-center  w-100' style={{ zIndex: "2" }}>
              <div className='formDetails w-75'>
                <p className='fs-1 text-white fw-bold text-center'>Sign Up</p>
                <hr className='w-25 m-auto text-white' style={{ borderWidth: "3px", opacity: "100" }}></hr>
                <form className='mt-5' onSubmit={handleSubmit}>
                  <div className="mb-3 form-floating">
                    <input type="text" placeholder='Enter Email Id' className="form-control" value={email} onChange={(e) =>{setEmail(e.target.value);setEmailWarning(false)}} required />
                    <label>Enter Email Id</label>
                    {emailWarning&&<p className='text-white'>Email already exist!!</p>}
                  </div>
                  <div className='mb-3 form-floating'>
                    <input type="password" placeholder='Enter Password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Enter password</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input type="password" placeholder='Confirm Password' className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <label>Confirm Password</label>
                    {passwordWarning&&<p className='text-white'>Password not matched!!</p>}
                  </div>
                  <div className='d-flex'><button className='m-auto btn  fw-bold submitButton' style={{ backgroundColor: "rgba(147,25,255,255)" }}>Submit</button></div>
                </form>
                <div>
                  <p className='text-center text-white mt-4 fs-6 mb-0 pb-0'>Already a member?<Link to="/" style={{ textDecoration: 'none' }} className='text-white text-decoration-none fs-5 fw-bold'> LOG IN</Link> </p>
                  {/* <hr className='text-white mt-0' style={{ width: "38px", borderWidth: "3px", opacity: "100", marginLeft: "60%" }}></hr> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp