import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import DashboardHeader from '../../components/DashboardHeader'
import "../../components/LoginForm/LoginForm.css"
import Swal from 'sweetalert2';
import axios from '../../constants/axios';
import { useParams } from 'react-router-dom';
import { userUpdate, user } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        if (authTokens && !isMounted) { 
            setIsMounted(true);
        }
        const access = authTokens.access;
        const url = `${user}${userId}`
        axios
            .get(url, {
              headers: { "Authorization": `Bearer ${access}`},
            }).then((response) => {
                setUsername(response.data.username);
                setEmail(response.data.email);
                console.log(response.data);
              })
              .catch((error) => {
                console.log("error",error);
              });


    },[isMounted, userId])

    const handleSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
          }).then((result) => {
            if (result.isConfirmed) {
              const authTokens = JSON.parse(localStorage.getItem('authTokens'))
              const access = authTokens.access;
              const url = `${userUpdate}${userId}`
              const formData = new FormData();
              formData.append('username', username);
              formData.append('email', email);
              axios
              .post(url,formData, {
                headers: { "Authorization": `Bearer ${access}`},
              })
              .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'The user details have been updated.',
                      icon: 'success'
                    }).then(() => {
                      navigate('/dashboard');
                    });
                  } else {
                    Swal.fire({
                      title: 'Error!',
                      text: response.error,
                      icon: 'error'
                    })
                  }
                })
                .catch((error) => {
                  Swal.fire({
                    title: 'Error!',
                    text: error,
                    icon: 'error'
                  });
                });
  
            }
          });
    }

  return (
    <>
    <DashboardHeader/>
    <div className="login-body">
    <Card>
      <h1 className="title">UPDATE USER</h1>
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
          {/* <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </div>
        <input type="submit" value="Update" className="login_button" />
      </form>
    </Card>
    </div>
    </>
  )
}

export default UpdateUser
