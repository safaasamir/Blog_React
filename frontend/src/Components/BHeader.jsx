import React, { useContext, useEffect, useState } from "react";
import profilelogo from "../assets/profile.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../hooks/Usercontext";
export default function BHeader() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate =useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
         //console.error("Error fetching profile:", error);
      });
  }, []);
  
  const logout = () => {
    axios
      .post("http://localhost:4000/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        setUserInfo(null);
        navigate("/")
      })
      .catch((error) => {
        // console.error("Error during logout:", error);
      });
  };
  const username = userInfo?.username;
  // console.log(username.slice(1,2).uppercase)
  return (
    <div className="navbar  bg-blue-200">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          My Blog
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-5">
       
          
          <li className="ms-1">
            {username && (
              <>
                <Link onClick={logout}>Logout</Link>
              </>
            )}
            {!username && <Link  to="/login">Login</Link>}
          </li>

           {username?<li className=" font-serif text-xl w-10 h-10 flex items-center justify-center rounded-full bg-blue-950 text-white px-3"> {username.slice(0,1).toUpperCase()}</li>:<a href="#">
        <img
          src={profilelogo}
          className="w-10 img-fluid ms-3 mb-1 ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
          alt=" my photo to"
        />
      </a>}
        </ul>
      </div>
    </div>
  );
}
