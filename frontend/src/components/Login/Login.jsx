import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';
import {login} from '../../utils/Constants'
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/authTokenSlice";
import './Login.css'
import { Link } from 'react-router-dom';



function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
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
                // console.log(jwt_decode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                // console.log(JSON.stringify(response.data))
                dispatch(setAuthToken(JSON.stringify(response.data)))
                navigate("/");
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
    }

    return (

      <div className='outer-container'>
        <div className='inner-container'>
          <div className='logo'>
            <h1>LOGIN</h1>
            <img src='/images/login.jpg' alt='My Image' />
          </div>
          <div className='form-container'>
          <form onSubmit={handleLogin} className="sign-in-form">
            
          <div className='form-field'>
            <label>Username:</label>
            <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                      setUsername(e.target.value);
                          }} 
                  />
          </div>
           
            <div className='form-field'>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
            </div>
            <button type='submit'>Login</button>
            <p>Not registered yet?<Link to="/signup">Register</Link></p>
            </form>
  
          </div>
        </div>
      </div>
    )
}

export default Login
