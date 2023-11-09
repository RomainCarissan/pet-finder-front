import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./../../context/AuthContext";

function Navbar() {
  const { isLoggedIn, authenticateUser, user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  console.log(user);
  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>

            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/">
        <h1>PetFinder</h1>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
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
