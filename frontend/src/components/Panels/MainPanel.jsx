import React from 'react'
import SignUpPanel from './SignUpPanel'
import LoginPanel from './LoginPanel'

function MainPanel() {
  return (
    <>
    <div className="panels-container">

    <LoginPanel/>
    <SignUpPanel/>

    </div>
    </>
  )
}

export default MainPanel