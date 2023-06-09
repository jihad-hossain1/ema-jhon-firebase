import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false)
  console.log(location);

const from = location.state?.from?.pathname || '/';
  // const [success, setSuccess] = useState();
  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // setSuccess(loggedUser);
        console.log(loggedUser);
        form.reset();
        navigate(from, {replace: true})
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-12 ">
        <div className="border rounded-md py-4 px-10">
          <h2 className="text-2xl text-center py-2">LogIn</h2>
          <form onSubmit={handleLogin}>
            <div className="">
              <label htmlFor="">Email</label>
              <br />
              <input
                className="border pl-2 py-1 my-1"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="">
              <label htmlFor="">Password</label>
              <br />
              <input
                className="border pl-2 py-1 my-1"
                type={show ? 'text' : "password"}
                name="password"
                required
              />
            </div>
            <p onClick={() => setShow(!show)}
            className="border px-1 rounded inline-block hover:bg-slate-300 cursor-pointer"
            >
              <small>
                {
                  show ? <span>Hide Password</span> : <span>Show Password</span>
                }
              </small>
            </p>
            <div className="text-center my-6 ">
              <input
                type="submit"
                value="LogIn"
                className="bg-yellow-400 w-full rounded-md px-5 py-1 cursor-pointer"
              />
            </div>
          </form>
          <p>
            <small>
              new user ?{" "}
              <Link className="text-yellow-600 underline" to="/signup">
                Please Sign-Up
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
