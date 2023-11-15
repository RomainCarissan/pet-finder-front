import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PetMap from "../../components/PetMap/PetMap.jsx";

function HomePage() {
  const { isLoggedIn } = useAuth();

  /* if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  } */
  return (
    <div className="homePageContainer">
      {isLoggedIn ? (
        <div className="buttonsHolder">
          <Link to="/lost-pet">
            <button className="homepageButton">I found a pet</button>
          </Link>
          <Link to="/found-pet">
            <button className="homepageButton">I lost a pet</button>
          </Link>
        </div>
      ) : (
        <div className="buttonsHolder">
          <Link to="/login">
            <button className="homepageButton">I found a pet</button>
          </Link>
          <Link to="/login">
            <button className="homepageButton">I lost a pet</button>
          </Link>
        </div>
      )}
      <div className="mapHolder">
        <PetMap></PetMap>
        {/* <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "15rem", width: "25rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

           "lat": "43.7159395","lon": "10.4018624", 
          <Marker position={[51.505, -0.09]}>
            <Popup>
              Name of the Pet <br /> date
              <h1>Lost/Found</h1>
            </Popup>
          </Marker>
        </MapContainer> */}
      </div>
    </div>
  );
}

export default HomePage;
