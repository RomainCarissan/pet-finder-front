import { useRef, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
// import { AuthContext } from "./../context/AuthContext.jsx"

/**
 * To have access to the values store in a context we neee:
 * - the Context (AuthContext here)
 * - useContext to well.. Use the context.?
 */

function LoginPage() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { authenticateUser } = useAuth();

  // const something = useContext(AuthContext)

  // console.log(context)
  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    try {
      const response = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });
      console.log("success", response);
      localStorage.setItem("authToken", response.data.token);
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" ref={emailInput} id="email" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" ref={passwordInput} id="password" />
      </div>
      <button>Login</button>
      <p className="error">{error}</p>
    </form>
  );
}

export default LoginPage;