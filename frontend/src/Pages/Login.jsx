import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersShemalogin } from "../interface/users";
import Input from "../Components/Input";
import axios from "axios";
import { UserContext } from "../hooks/Usercontext";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const handeleLogin = async (e) => {
    try {
      e.preventDefault();
      setError({ email: null, password: null });
      const check = UsersShemalogin.validateSync(form, { abortEarly: false });
      const response = await axios.post(
        "http://localhost:4000/users/login",
        { email: form.email, password: form.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          
        }
      );

      if (response.status === 200) {
        // console.log("ok");
        // console.log(response.data);
         setUserInfo(response.data)
      
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError({
        email: "wrong email or pasword",
        password: "wrong email or pasword",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex  justify-center items-center   " style={{ height:"100vh" }}>
      <div className="  w-96 border border-teal-950 shadow-2xl p-10 rounded-lg">
      <h1 className="text-center text-2xl bold">Login</h1>
        <form onSubmit={handeleLogin}>
          {(error.email || error.password) && (
            <span className="text-red-500"> Email or Password is Wrong </span>
          )}
          {error.email || error.password ? (
            <>
              <Input
                type="text"
                className="grow"
                value={form.email}
                name="email"
                change={handleChange}
                placeholder="email"
                labelclass="input input-bordered flex items-center gap-2  my-5 border-red-700"
              />

              <Input
                type="password"
                className="grow"
                value={form.password}
                name="password"
                change={handleChange}
                placeholder="password"
                labelclass="input input-bordered flex items-center gap-2  my-5 border-red-700 "
              />
            </>
          ) : (
            <>
              <Input
                type="string"
                className="grow"
                value={form.email}
                name="email"
                change={handleChange}
                placeholder="email"
                labelclass="input input-bordered flex items-center gap-2  my-5 "
              />

              <Input
                type="password"
                className="grow"
                value={form.password}
                name="password"
                change={handleChange}
                placeholder="password"
                labelclass="input input-bordered flex items-center gap-2  my-5 "
              />
            </>
          )}

          <Link to="/signup" className="text-lime-950 ms-6">
            {" "}
            I don't have account
          </Link>
          <div className="flex ">
            <button className="btn bg-blue-700 ms-auto text-slate-50 hover:bg-blue-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
