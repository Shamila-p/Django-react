import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./navbar.css";
// import { GiRocketThruster } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { change } from "../../redux/usernameSlice";
import { setAuthToken } from "../../redux/authTokenSlice";
import axios from "../../utils/axios";
import { verifyToken } from "../../utils/Constants";
import jwt_decode from "jwt-decode";
import { refreshTokens } from "../../redux/refreshTokenTunk";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const logoutHandle = () => {
      localStorage.clear();
      dispatch(change(null));
      dispatch(setAuthToken(null))
      console.log("exiting")
    }

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
                console.log(JSON.stringify(localStorage.getItem('authTokens')))
                dispatch(change(decodedToken.username))
                dispatch(setAuthToken(JSON.stringify(localStorage.getItem('authTokens'))))
            }
          })
          .catch((err) => {
            localStorage.clear();
            dispatch(change(null))
            dispatch(setAuthToken(null))
            navigate('/login')
          });
      }else{
        localStorage.clear();
        dispatch(change(null))
        dispatch(setAuthToken(null))
        navigate('/login')
      }
},[dispatch, navigate])

useEffect(() => {
  const intervalId = setInterval(async () => {
    await refreshTokens();
  }, 1800000 );
  
  return () => clearInterval(intervalId);
}, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                to='/login'
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={logoutHandle}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
