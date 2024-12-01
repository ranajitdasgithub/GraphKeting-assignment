import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoutAction } from "../redux/AuthReducer/action";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuth, userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("username", isAuth, userName);
  const initial = userName.charAt(0).toUpperCase(); // First letter of the user's name

  const handleLogout = () => {
    dispatch(LogoutAction());
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          {isAuth && userName ? (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
        {isAuth && userName && (
          <div className="nav-right">
            <div className="profile">
              <div className="avatar">{initial}</div>
              <div className="profile-details">{userName}</div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;