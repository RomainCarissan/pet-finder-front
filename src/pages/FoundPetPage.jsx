import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function FoundPetPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return (
    <>
      <h1>FoundPetPage</h1>
      <div>
        <Link to="/found-pet-form">
          <button>Report a found</button>
        </Link>
      </div>
    </>
  );
}

export default FoundPetPage;
