import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import myApi from "../../service/service";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  /* const lossIcon = new L.Icon({
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
    <>
      <MapContainer
        center={[46.603354, 1.8883335]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "20rem", width: "25rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allLossReports &&
          allLossReports.map((report) => {
            if (report.latLon === "null" || !report.latLon) {
              return null;
            }
            return (
              <div key={report._id}>
                <Marker
                  position={report.latLon.split(",")}
                  /* icon={lossIcon} */ icon={getColorMarker("red")}
                >
                  <Popup>
                    <div>
                      <img
                        src={report.picture}
                        alt={`${report._id} image`}
                        style={{ height: "5rem" }}
                      />
                    </div>
                    Name: {report.petName} <br />
                    Lost since:
                    {formatDate(report.lossDate)}
                    <h3>Lost around {report.lossPlace}</h3>
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
                  <Popup>
                    <div>
                      <img
                        src={report.picture}
                        alt={`${report._id} image`}
                        style={{ height: "5rem" }}
                      />
                    </div>
                    Name: {report.petName} <br />
                    Found since: {formatDate(report.foundDate)}
                    <h3>Found around: {report.foundPlace}</h3>
                  </Popup>
                </Marker>
              </div>
            );
          })}
      </MapContainer>
    </>
  );
}

export default PetMap;