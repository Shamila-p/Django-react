import React,{useEffect} from 'react';
import './styles.css';
// import NotificationIcon from '../../assets/icons/notification.svg';
// import SettingsIcon from '../../assets/icons/settings.svg';
import axios from '../../constants/axios';
import { verifyToken } from '../../constants/urls';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../redux/authTokenSlice';
import { useNavigate } from 'react-router-dom';
import { change } from "../../redux/usernameSlice";
import { useSelector } from 'react-redux';
import { baseUrl } from '../../constants/urls';
import { refreshTokens } from "../../redux/refreshTokenTunk";
import Swal from 'sweetalert2'
// import { Link } from 'react-router-dom';
// import { change2 } from '../../redux/imageSlice';


function DashboardHeader () {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const image = useSelector((state)=> state.username)

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        const refresh = authTokens?.refresh
        if (refresh) {
            const body = JSON.stringify({
                token: refresh,
              });
            axios
              .post(verifyToken, body, {
                headers: { "Content-Type": "application/json" },
              })
              .then((response) => {
                if (response.status === 200){
                    const token = JSON.parse(response.config.data).token;
                    const decodedToken = jwt_decode(token)
                    console.log(decodedToken)
                    dispatch(change(decodedToken.image))
                    // dispatch(change2("/media/images/profile-rohit.jpeg"))
                    dispatch(setAuthToken(JSON.stringify(localStorage.getItem('authTokens'))))
                }
              })
              .catch((err) => {
                console.log(err)
                localStorage.clear();
                dispatch(change(null))
                // dispatch(change2(null))
                dispatch(setAuthToken(null))
                navigate('/admin')
              });
          }else{
            localStorage.clear();
            dispatch(change(null))
            // dispatch(change2(null))
            dispatch(setAuthToken(null))
            navigate('/admin')
          }
    },[dispatch, navigate])

    useEffect(() => {
        const intervalId = setInterval(async () => {
          await refreshTokens();
        }, 1800000 );
        
        return () => clearInterval(intervalId);
      }, []);

    const imageurl = `${baseUrl}${image}`

    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          dispatch(change(null));
          dispatch(setAuthToken(null))
          navigate('/admin')
        }
      })
    }

    return(
        <div className='dashbord-header-container'>
            <div className='dashbord-header-right'>
                    <button className='dashbord-header-btn' onClick={()=>navigate('/dashboard/create')}>Add User</button>
                    <button className='dashbord-header-btn' onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    )
}

export default DashboardHeader;