import React, { useState, useEffect} from "react";
import "./LoginForm.css";
import Card from "../Card/Card";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
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
    <div className="login-body">
    <Card>
      <h1 className="title">Sign In</h1>
      <p className="subtitle">
        Please log in using your username and password!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* {renderErrorMsg("username")}
          {renderErrorMsg("noUsername")} */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {renderErrorMsg("password")}
          {renderErrorMsg("noPassword")} */}
        </div>
        <input type="submit" value="Log In" className="login_button" />
      </form>
      {/* <div className="link_container">
        <a href="" className="small">
          Forgot Password?
        </a>
      </div> */}
      <div className="icons">
        <GoogleIcon className="icon" />
        <FacebookIcon className="icon" />
        <TwitterIcon className="icon" />
      </div>
    </Card>
    </div>
  );
};

export default LoginForm;
