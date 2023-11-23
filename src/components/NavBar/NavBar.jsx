import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { useState } from "react";
import { useAuth } from "./../../context/AuthContext.jsx";
import petFinderLogo from "../../images/petfinder-logo-v5.png";

function Navbar() {
  const { isLoggedIn, authenticateUser, user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  console.log(user);
  return (
    <div className="Navbar">
      <nav className="leftNavBarSide">
        <ul className="leftLinks">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <NavLink to="/my-profil">My Profil</NavLink>
            ) : (
              <NavLink to="/login">My Profil</NavLink>
            )}
          </li>
        </ul>
      </nav>
      <Link to="/">
        <img src={petFinderLogo} alt="logo" />
      </Link>
      <nav className="rightNavBarSide">
        <ul className="rightLinks">
          {isLoggedIn ? (
            <>
              <li>Hi {user && user.name}!</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
