// import { color } from '@mui/system';
import React, { useState } from 'react'
import Card from '../../components/Card/Card'
import DashboardHeader from '../../components/DashboardHeader'
import "../../components/LoginForm/LoginForm.css"
import Swal from 'sweetalert2';
import axios from '../../constants/axios';
import { useNavigate } from 'react-router-dom';
import { userCreate } from '../../constants/urls';

function CreateUser() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


      const handleSubmit = (event) => {
        event.preventDefault();
      
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to create an user .',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, create it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
      
            const authTokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = authTokens.access;
      
            axios.post(userCreate, formData, {
              headers: { "Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
            })
              .then((response) => {
                if (response.status === 201) {
                  Swal.fire({
                    title: 'Success!',
                    text: 'The user details have been updated.',
                    icon: 'success'
                  }).then(() => {
                    // redirect to dashboard after success
                    navigate('/dashboard');
                  });
                } else {
                  Swal.fire({
                    title: 'Error!',
                    text: 'Invalid Details',
                    icon: 'error'
                  })
                }
              })
              .catch((error) => {
                console.log(error.response.data);
                Swal.fire({
                  title: 'Error!',
                  text: 'Invalid Details',
                  icon: 'error'
                });
              });
          }
        });
      };
      

  return (
    <>
    <DashboardHeader/>
    <div className="login-body">
    <Card>
      <h1 className="title">CREATE USER</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Create" className="login_button" />
      </form>
    </Card>
    </div>
    </>
  )
}

export default CreateUser
