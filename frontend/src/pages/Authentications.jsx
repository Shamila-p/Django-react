import React from 'react'
import Auth from '../components/Auth/Auth'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Authentications() {

  const navigate = useNavigate()

  useEffect(() =>{
    if (localStorage.getItem("authTokens")){
      navigate("/");
    }
  })


  return (
    <>
    <Auth/>
    </>
  )
}

export default Authentications