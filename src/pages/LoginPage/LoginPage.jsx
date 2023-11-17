import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import myApi from "../../service/service.js";
import "./LoginPage.css";

function LoginPage() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    try {
      const response = await myApi.post("/auth/login", {
        email,
        password,
      });
      //console.log("success", response);
      localStorage.setItem("authToken", response.data.authToken); //save authToken to localStorage

      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000); //clear the message after 3sec
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
