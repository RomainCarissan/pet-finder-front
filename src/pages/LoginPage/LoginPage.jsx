import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import myApi from "../../service/service.js";
import "./LoginPage.css";
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
      const response = await myApi.post("/auth/login", {
        email,
        password,
      });
      console.log("success", response);
      localStorage.setItem("authToken", response.data.authToken);

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
    <>
      <div className="titleSignIn">
        <h1>Please, log in...🦦</h1>
      </div>
      <form onSubmit={handleSubmit} className="formSignIn">
        <div>
          <label htmlFor="email" className="labelSignIn">
            Email:{" "}
          </label>
          <input
            type="text"
            ref={emailInput}
            id="email"
            autoComplete="off"
            className="inputSignIn"
          />
        </div>
        <div>
          <label htmlFor="password" className="labelSignIn">
            Password:{" "}
          </label>
          <input
            type="password"
            ref={passwordInput}
            id="password"
            className="inputSignIn"
          />
        </div>
        <div>
          <button className="buttonSignIn">Login</button>
        </div>
        <p className="error">{error}</p>
      </form>
    </>
  );
}

export default LoginPage;
