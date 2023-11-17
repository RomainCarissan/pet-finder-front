import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import myApi from "../../service/service.js";
import "./ProfilPage.css";

function ProfilPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = user._id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalLossReports, setPersonalLossReports] = useState(null);
  const [personalFoundReports, setPersonalFoundReports] = useState(null);

  //fetch all the reports of a specific creator
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lossResponse = await myApi.get(`/api/lostpets/creator/${userId}`);
        setPersonalLossReports(lossResponse.data);
        const foundResponse = await myApi.get(
          `/api/foundpets/creator/${userId}`
        );
        setPersonalFoundReports(foundResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false even in case of an error
      }
    };
    fetchData();
  }, [userId]);

  //======Actions Handling==========//

  /* const handleDeleteLostReport = async (id) => {
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
  }; */

  const handleDeleteLostReport = async (id) => {
    try {
      await myApi.delete("api/lostpets/" + id);
      // Filter out the deleted report from the state
      // Ensure most up-to-date info without having to fetch all the reports again
      setPersonalLossReports((prevReports) =>
        prevReports.filter((lostPet) => lostPet._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFoundReport = async (id) => {
    try {
      await myApi.delete("api/foundpets/" + id);
      // Filter out the deleted report from the state
      // Ensure most up-to-date info without having to fetch all the reports again
      setPersonalFoundReports((prevReports) =>
        prevReports.filter((foundPet) => foundPet._id !== id)
      );
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

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }
  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  const formatDate = (dateString) => {
    //undefined formate the date in the computer's default language
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <>
      <div className="myProfilDisplay">
        {personalLossReports &&
          personalLossReports.map((lostPet) => {
            return (
              <div className="onePersonalLossReport" key={lostPet._id}>
                <div className="myReportDisplay">
                  <div className="myReport-img">
                    <img src={lostPet.picture} alt={`${lostPet._id} Image`} />
                  </div>
                  <div className="myReport-info">
                    <h2>{lostPet.petName}</h2>
                    <h4>Lost around: {lostPet.lossPlace}</h4>
                    <h4>On the: {formatDate(lostPet.lossDate)}</h4>
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
                    {lostPet.description && <p>{lostPet.description}</p>}
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
            );
          })}
        {personalFoundReports &&
          personalFoundReports.map((foundPet) => {
            return (
              <div className="onePersonalFoundReport" key={foundPet._id}>
                <div className="myReportDisplay">
                  <div className="myReport-img">
                    <img src={foundPet.picture} alt={`${foundPet._id} Image`} />
                  </div>
                  <div className="myReport-info">
                    <h2>{foundPet.petName}</h2>
                    <h4>Found around: {foundPet.foundPlace}</h4>
                    <h4>On the: {formatDate(foundPet.foundDate)}</h4>
                    <h4>Pet Type: {foundPet.petType}</h4>
                    <h4>Sex: {foundPet.petSex}</h4>
                    {foundPet.breed && <h4>Breed: {foundPet.breed}</h4>}
                    <h4>Color: {foundPet.colors}</h4>
                    <h4>Tatoo/Chip: {foundPet.identification}</h4>
                    {foundPet.description && <p>{foundPet.description}</p>}
                  </div>
                </div>
                {foundPet.creator === userId && (
                  <div className="myReport-actions">
                    <div onClick={() => handleDeleteFoundReport(foundPet._id)}>
                      🗑️
                    </div>

                    <div onClick={() => handleUpdateFoundForm(foundPet._id)}>
                      ✏️
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProfilPage;
