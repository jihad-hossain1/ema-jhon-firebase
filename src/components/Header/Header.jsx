import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);

  const handleLogOut = () => {
    logOut()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        {user && (
          <span className="px-2 text-yellow-500 rounded-md my-2 mx-3">
            {user.email}
            <button
              onClick={handleLogOut}
              className="text-white border px-2 rounded"
            >
              Sing out
            </button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
