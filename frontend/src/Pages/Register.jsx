import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Components/Input";

import { UsersShemasign } from "../interface/users";
export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    username: null,
    email: null,
    password: null,
  });
  const navigate=useNavigate()
  const Register = async (e) => {
    try {
      e.preventDefault();
      setError({ email: null, password: null, username: null });
      const check = UsersShemasign.validateSync(
        { username, email, password },
        { abortEarly: false }
      );
      // console.log(check);
      const response = await axios.post(
        "http://localhost:4000/users/signup",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate('/login', { replace: true })
      // console.log(check);
    } catch (e) {
      
        setError({
          username: "wrong user name",
          email: "wrong email",
          password: "wrong password",
        });
     
      // console.log(error);
    }
   
  };
  return (
    <div className="flex  justify-center items-center  " style={{ height:"100vh" }}>
    
      <div className="  w-96 border border-teal-950 p-10 rounded-lg shadow-2xl">
      <h1 className="text-center text-2xl bold">SignUp</h1>
        <form onSubmit={Register}>
          {error.email || error.password || error.username ? (
            
            <>
            <span className="text-red-500"> Wrong Register Try Again! </span>
              <Input
                labelclass="input input-bordered flex items-center gap-2  my-5 border-red-700"
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                change={(e) => setUserName(e.target.value)}
                name="username"
              />
              <Input
                labelclass="input input-bordered flex items-center gap-2 my-5 border-red-700"
                type="text"
                name="email"
                className="grow"
                placeholder="Email"
                value={email}
                change={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="password"
                className="grow"
                placeholder="password"
                value={password}
                change={(e) => setPassword(e.target.value)}
                labelclass="input input-bordered flex items-center gap-2  my-5 border-red-700"
              />
            </>
          ) : (
            <>
              {" "}
              <Input
                labelclass="input input-bordered flex items-center gap-2  my-5"
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                change={(e) => setUserName(e.target.value)}
                name="username"
              />
              <Input
                labelclass="input input-bordered flex items-center gap-2 my-5"
                type="text"
                name="email"
                className="grow"
                placeholder="Email"
                value={email}
                change={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="password"
                className="grow"
                placeholder="password"
                value={password}
                change={(e) => setPassword(e.target.value)}
                labelclass="input input-bordered flex items-center gap-2  my-5"
              />
            </>
          )}
           <span>
           I have
            <Link to="/login" className=" text-blue-800 underline ms-1">
            {" "}
             account
          </Link>
           </span>
         
          <div className="flex ">
            <button className="btn bg-blue-700 ms-auto text-slate-50 hover:bg-blue-400">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
