import { createContext, useContext, useState, useEffect } from "react";
import myApi from "./../service/service.js";

// Create a context for authentication data
const AuthContext = createContext();

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// Wrapper component for the authentication context
function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to authenticate the user and load user data
  async function authenticateUser() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }
    try {
      const res = await myApi.getUserInfos();
      //console.log(res);
      setUser(res.data);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  // Provide the authentication data to the children components
  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
