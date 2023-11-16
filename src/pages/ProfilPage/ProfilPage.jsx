import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import myApi from "../../service/service.js";
import "./ProfilPage.css";

function ProfilPage() {
  const [personalLossReports, setPersonalLossReports] = useState(null);
  const [personalFoundReports, setPersonalFoundReports] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = user["_id"];
  //console.log(userId);

  async function fetchPersonalReports(endpoint, setDataFunction, userId) {
    try {
      const response = await myApi.get(`/api/${endpoint}/creator/${userId}`);
      setDataFunction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPersonalReports("lostpets", setPersonalLossReports, userId);
    fetchPersonalReports("foundpets", setPersonalFoundReports, userId);
  }, [userId]);

  const handleDeleteLostReport = async (id) => {
    try {
      const res = await myApi.delete("api/lostpets/" + id);
      await fetchPersonalReports("lostpets", setPersonalLossReports);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFoundReport = async (id) => {
    try {
      const res = await myApi.delete("api/foundpets/" + id);
      await fetchPersonalReports("foundpets", setPersonalFoundReports);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLossForm = (id) => {
    navigate(`/lost-pet-form-update/${id}`);
  };

  const handleUpdateFoundForm = (id) => {
    navigate(`/found-pet-form-update/${id}`);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  return (
    <>
      <div className="myProfilDisplay">
        {personalLossReports &&
          personalLossReports.map((lostPet) => {
            //console.log(lostPet);
            return (
              <React.Fragment key={lostPet._id}>
                <div className="onePersonalLossReport">
                  <div className="myReportDisplay">
                    <div className="myReport-img">
                      <img src={lostPet.picture} alt={`${lostPet._id} Image`} />
                    </div>
                    <div className="myReport-info">
                      <h2>{lostPet.petName}</h2>
                      {/* <h4>Lost around {formatDate(lostPet.lossPlace)}</h4> */}
                      <h4>Lost around {lostPet.lossPlace}</h4>
                      <h4>On the: {lostPet.lossDate}</h4>
                      <h4>Pet Type: {lostPet.petType}</h4>
                      <h4>Sex: {lostPet.petSex}</h4>
                      <h4>Breed: {lostPet.breed}</h4>
                      <h4>Mixed: {lostPet.mixed}</h4>
                      <h4>Color: {lostPet.colors}</h4>
                      <h4>Sterilized: {lostPet.sterilized}</h4>
                      <h4>Tatoo/Chip: {lostPet.identification}</h4>
                      <h4>
                        Age: {lostPet.age} {lostPet.ageUnit}
                      </h4>
                      <p>{lostPet.description}</p>
                    </div>
                  </div>

                  {lostPet.creator === userId && (
                    <div className="myReport-actions">
                      <div onClick={() => handleDeleteLostReport(lostPet._id)}>
                        🗑️
                      </div>
                      <div onClick={() => handleUpdateLossForm(lostPet._id)}>
                        ✏️
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        {personalFoundReports &&
          personalFoundReports.map((foundPet) => {
            return (
              <React.Fragment key={foundPet._id}>
                <div className="onePersonalFoundReport">
                  <div className="myReportDisplay">
                    <div className="myReport-img">
                      <img
                        src={foundPet.picture}
                        alt={`${foundPet._id} Image`}
                      />
                    </div>
                    <div className="myReport-info">
                      <h2>{foundPet.petName}</h2>
                      <h4>Found around: {foundPet.foundPlace}</h4>
                      {/* <h4>On the: {formatDate(foundPet.foundDate)}</h4> */}
                      <h4>Pet Type: {foundPet.petType}</h4>
                      <h4>Sex: {foundPet.petSex}</h4>
                      <h4>Breed: {foundPet.breed}</h4>
                      <h4>Color: {foundPet.colors}</h4>
                      <h4>Tatoo/Chip: {foundPet.identification}</h4>
                      <p>{foundPet.description}</p>
                    </div>
                  </div>
                  {foundPet.creator === userId && (
                    <div className="myReport-actions">
                      <div
                        onClick={() => handleDeleteFoundReport(foundPet._id)}
                      >
                        🗑️
                      </div>

                      <div onClick={() => handleUpdateFoundForm(foundPet._id)}>
                        ✏️
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}

export default ProfilPage;
