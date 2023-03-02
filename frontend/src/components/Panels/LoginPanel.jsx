import React,{useContext} from 'react'
import signIn_Img from '../../assets/log.svg'
import {SignUpModeContext} from '../../Context/SignUpMode'

function LoginPanel() {

  const { setSignUpState } = useContext(SignUpModeContext);

  return (
    <>
    <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button onClick={() => setSignUpState(true)} class="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={signIn_Img} class="image" alt="" />
    </div>
    </>
  )
}

export default LoginPanel