import React,{useState, useEffect} from 'react'
import Login from '../Login/Login'
import MainPanel from '../Panels/MainPanel'
import SignUp from '../SignUp/SignUp'
import './auth.css'
import {SignUpModeContext} from '../../Context/SignUpMode'
import { useLocation, useNavigate} from "react-router-dom" 


function Auth() {

  const [signUpState, setSignUpState] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === "/signup") {
      setSignUpState(true);
    } else if (location.pathname === "/login") {
      setSignUpState(false);
    }
  }, [location]);

  useEffect(() => {
    if (!isInitialRender) {
      if (!signUpState) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    } else {
      setIsInitialRender(false);
    }
  }, [signUpState]);


  return (
    <div className='body'>
      <div className={signUpState ? "container sign-up-mode": "container"}>
      <div className="forms-container">
        <div className="signin-signup">
         <Login/>
         <SignUp/>
        </div>
      </div>
      <SignUpModeContext.Provider value={{ setSignUpState }}>
      <MainPanel/>
      </SignUpModeContext.Provider>
    </div>
        
  </div>
  )
}

export default Auth
