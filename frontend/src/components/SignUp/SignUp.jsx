import React,{useState} from 'react'
import { register } from "../../utils/Constants";
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import Swal from "sweetalert2";

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
    <>
    <form onSubmit={handleSubmit} className="sign-up-form">
        <h2 className="title">Sign up</h2>
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
            <i className="fas fa-envelope"></i>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <input type="submit" className="btn" value="Sign up" />
    </form>
    </>
  )
}

export default SignUp
