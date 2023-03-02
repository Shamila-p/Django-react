import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';
import {login} from '../../utils/Constants'
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/authTokenSlice";



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
    <>
    <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                        }} 
                />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              />
            </div>
            <input
            type="submit"
            value="Login"
            className="btn solid"
            />
          </form>
    </>
  )
}

export default Login
