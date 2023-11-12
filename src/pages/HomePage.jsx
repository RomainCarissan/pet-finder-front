import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function HomePage() {
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
      <div className="form-block">
        <Link to="/lost-pet">
          <button>I found a pet</button>
        </Link>
        <Link to="/found-pet">
          <button>I lost a pet</button>
        </Link>
      </div>
      <div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "15rem", width: "25rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* "lat": "43.7159395",
    "lon": "10.4018624", */}
          <Marker position={[51.505, -0.09]}>
            <Popup>
              Name of the Pet <br /> date
              <h1>Lost/Found</h1>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default HomePage;
