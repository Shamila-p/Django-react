import React,{useState} from 'react'
import { register } from "../../utils/Constants";
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const body = JSON.stringify({
            username,
            email,
            password,
          });
      
          e.preventDefault();
          axios
            .post(register, body, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              console.log(response.status)
              if (response.status === 201) {
                navigate("/login");
              } else {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: response.data.error,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((error) => {
                const err = error.response.data.username[0]
              Swal.fire({
                position: "center",
                icon: "warning",
                title: err,
                showConfirmButton: false,
                timer: 1500,
              });
            });
    }

    return (
      <div className='main-container'>
        <div className='innermost-container'>
          <div className='logo-img'>
            <img src='/images/reg.jpg' alt='My Image' />
          </div>
          <div className='form-main-container'>
          <h1>SIGNUP</h1>
          <form onSubmit={handleSubmit} className="sign-up-form">
  
          <div className='form-fields'>
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
            <div className='form-fields'>
              <label>Email:</label>
              <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                    }}
              />
            </div>
            
            <div className='form-fields'>
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
            <button type='submit'>Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>

          </div>
        </div>
  
      </div>
    );
}

export default SignUp
