import React,{useContext} from 'react'
import signUp_Img from '../../assets/register.svg'
import {SignUpModeContext} from '../../Context/SignUpMode'

function SignUpPanel() {

  const { setSignUpState } = useContext(SignUpModeContext);

  return (
    <>
    <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button onClick={() => setSignUpState(false)} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={signUp_Img} className="image" alt="" />
        </div>
    </>
  )
}

export default SignUpPanel
