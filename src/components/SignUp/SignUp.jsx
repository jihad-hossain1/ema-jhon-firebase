import React, { useContext, useState } from "react";
import "./singup.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser } = useContext(AuthContext);
  const handleSingUP = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    // console.log(email, password, confirm);
    setError("");
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("Must be 6 character");
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess(loggedUser);

        form.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-12 ">
        <div className="border rounded-md py-4 px-10">
          <h2 className="text-2xl text-center py-2">Sign-Up</h2>
          <form onSubmit={handleSingUP}>
            <div className="">
              <label htmlFor="">Email</label>
              <br />
              <input
                className="border pl-2 py-1 my-1"
                type="email"
                name="email"
                id=""
                required
              />
            </div>
            <div className="">
              <label htmlFor="">Password</label>
              <br />
              <input
                className="border pl-2 py-1 my-1"
                type="password"
                name="password"
                id=""
                required
              />
            </div>
            <div className="">
              <label htmlFor="">Confirm Password</label>
              <br />
              <input
                className="border pl-2 py-1 my-1"
                type="password"
                name="confirm"
                id=""
                required
              />
            </div>
            <div className="text-center my-6 ">
              <input
                type="submit"
                value="Create Account"
                className="bg-yellow-400 w-full rounded-md px-5 py-1 cursor-pointer"
              />
            </div>
          </form>
          <p>
            <small>
              Already have an account ?{" "}
              <Link className="text-yellow-600 underline" to="/login">
                Please LogIn
              </Link>
            </small>
          </p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
