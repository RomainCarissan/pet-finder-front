import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function LostPetPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return <h1>LostPetPage</h1>;
}

export default LostPetPage;