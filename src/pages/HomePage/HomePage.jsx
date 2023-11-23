import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PetMap from "../../components/PetMap/PetMap.jsx";

function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="homePageContainer">
      {isLoggedIn ? (
        <div className="buttonsHolder">
          <Link to="/lost-pet">
            <button className="homepageButton">I've found a pet</button>
          </Link>
          <Link to="/found-pet">
            <button className="homepageButton">I've lost a pet</button>
          </Link>
        </div>
      ) : (
        <div className="buttonsHolder">
          <Link to="/login">
            <button className="homepageButton">I've found a pet</button>
          </Link>
          <Link to="/login">
            <button className="homepageButton">I've lost a pet</button>
          </Link>
        </div>
      )}
      <div className="mapHolder">
        <PetMap></PetMap>
      </div>
    </div>
  );
}

export default HomePage;
