import React, { useState, useEffect} from "react";
import "./Form.css";
import axios from "../../constants/axios"
import { login } from "../../constants/urls";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../../redux/authTokenSlice";


const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() =>{
    if (localStorage.getItem("authTokens")){
      navigate("/dashboard");
    }
  })

  const handleSubmit = (e) => {
    // Prevent page from reloading
    e.preventDefault();
    const body = JSON.stringify({
      username,
      password,
    });
    axios
        .post(login, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then ((response) => {

          if (response.status === 200) {
            const decoded_token = jwt_decode(response.data.access)
            if(decoded_token.is_superuser){
              localStorage.setItem('authTokens', JSON.stringify(response.data))
              dispatch(setAuthToken(JSON.stringify(response.data)))
              navigate("/dashboard");
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
            }else {
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid Credentials",
                  showConfirmButton: false,
                  timer: 1500,
                  });
                }        
          }
        else {
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid Credentials",
                  showConfirmButton: false,
                  timer: 1500,
                  });
                }
        }).catch((err) => {
          console.log(err)
          Swal.fire({
              position: "center",
              icon: "warning",
              title: "Invalid Credentials",
              showConfirmButton: false,
              timer: 1500,
              });
        });
    
  };

  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='logo'>
          <h1>ADMIN LOGIN</h1>
          <img src='./images/login.jpg' alt='My Image' />
        </div>
      <form onSubmit={handleSubmit}>

        <div className='form-container'>
          
          <div className='form-field'>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
         
          <div className='form-field'>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </div>
      </form>

      </div>
    </div>
  );
};

export default LoginForm;


