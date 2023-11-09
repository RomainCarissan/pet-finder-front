import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function HomePage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return <h1>HomePage</h1>;
}

export default HomePage;
