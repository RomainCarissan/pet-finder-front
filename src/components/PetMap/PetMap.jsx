import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../service/service";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./PetMap.css";

function PetMap() {
  const [allLossReports, setAllLossReports] = useState(null);
  const [allFoundReports, setAllFoundReports] = useState(null);

  async function fetchAllReports(endpoint, setDataFunction) {
    try {
      const response = await myApi.get(`/api/${endpoint}`);
      setDataFunction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllReports("lostpets", setAllLossReports);
    fetchAllReports("foundpets", setAllFoundReports);
  }, []);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  /* const lossIcon = new L.Icon({  //will be used to create custom icons
    iconUrl: "url-to-loss-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const foundIcon = new L.Icon({
    iconUrl: "url-to-found-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }); */

  const getColorMarker = (color) =>
    new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  return (
    <div>
      <MapContainer
        center={[46.603354, 1.8883335]}
        zoom={5}
        scrollWheelZoom={true}
        style={{
          height: "30rem",
          width: "35rem",
          borderRadius: "37px",
          display: "flex",
          flex: "1",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allLossReports &&
          allLossReports.map((report) => {
            //if there is a issue with the coords, this will avoid en error and display the next report
            if (report.latLon === "null" || !report.latLon) {
              return null;
            }
            return (
              <div key={report._id}>
                <Marker
                  position={report.latLon.split(",")}
                  /* icon={lossIcon} */ icon={getColorMarker("red")}
                >
                  <Popup className="Popup">
                    <div className="imageContainer">
                      <img src={report.picture} alt={`${report._id} image`} />
                    </div>
                    <div className="infoContainer">
                      Name: {report.petName} <br />
                      Lost since: {formatDate(report.lossDate)}
                      <br />
                      Tatoo: {report.identification}
                      <br />
                      Lost around: {report.lossPlace}
                    </div>
                    <Link to={`/lost-pet/${report._id}`}>
                      <h3>More details</h3>
                    </Link>
                  </Popup>
                </Marker>
              </div>
            );
          })}

        {allFoundReports &&
          allFoundReports.map((report) => {
            if (report.latLon === "null" || !report.latLon) {
              return null;
            }
            return (
              <div key={report._id}>
                <Marker
                  position={report.latLon.split(",")}
                  /* icon={foundIcon} */ icon={getColorMarker("green")}
                >
                  <Popup className="Popup">
                    <div className="imageContainer">
                      <img src={report.picture} alt={`${report._id} image`} />
                    </div>
                    <div className="infoContainer">
                      Name: {report.petName} <br />
                      Found since: {formatDate(report.foundDate)} <br />
                      Tatoo: {report.identification}
                      <br />
                      Found around: {report.foundPlace}
                    </div>
                    <Link to={`/found-pet/${report._id}`}>
                      <h3>More details</h3>
                    </Link>
                    <h3></h3>
                  </Popup>
                </Marker>
              </div>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default PetMap;
