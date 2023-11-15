import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import myApi from "../service/service.js";

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
    navigate(`/found-pet-form-update/${id}`);
  };

  const handleUpdateFoundForm = (id) => {
    navigate(`/found-pet-form-update/${id}`);
  };

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  return (
    <>
      {personalLossReports &&
        personalLossReports.map((lostPet) => {
          return (
            <React.Fragment key={lostPet._id}>
              <div className="lostPet">
                <div className="lostPet-img">
                  <img
                    src={lostPet.picture}
                    style={{ height: "10rem" }}
                    alt={`${lostPet._id} Image`}
                  />
                </div>
                <div className="lostPet-info">
                  <h3>{lostPet.petName}</h3>
                  {/* <h4>{lostPet.lossDate}</h4> */}
                  <h4>lost around: {lostPet.lossPlace}</h4>
                  <h4>{lostPet.petType}</h4>
                  <h4>{lostPet.petSex}</h4>
                  <h4>{lostPet.breed}</h4>
                  <h4>{lostPet.mixed}</h4>
                  <h4>{lostPet.colors}</h4>
                  <h4>{lostPet.sterilized}</h4>
                  <h4>{lostPet.identification}</h4>
                  <h4>
                    {lostPet.age} {lostPet.ageUnit}
                  </h4>
                  <h4>{lostPet.description}</h4>
                </div>
              </div>
              {lostPet.creator === userId && (
                <div>
                  <div onClick={() => handleDeleteLostReport(lostPet._id)}>
                    🗑️
                  </div>

                  <div>
                    <button onClick={() => handleUpdateLossForm(lostPet._id)}>
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      {personalFoundReports &&
        personalFoundReports.map((foundPet) => {
          return (
            <React.Fragment key={foundPet._id}>
              <div className="foundPet">
                <div className="foundPet-img">
                  <img
                    src={foundPet.picture}
                    style={{ height: "10rem" }}
                    alt={`${foundPet._id} Image`}
                  />
                </div>
                <div className="foundPet-info">
                  <h3>{foundPet.petName}</h3>
                  {/* <h4>{foundPet.foundDate}</h4> */}
                  <h4>found around: {foundPet.foundPlace}</h4>
                  <h4>{foundPet.petType}</h4>
                  <h4>{foundPet.petSex}</h4>
                  <h4>{foundPet.breed}</h4>
                  <h4>{foundPet.mixed}</h4>
                  <h4>{foundPet.colors}</h4>
                  <h4>{foundPet.sterilized}</h4>
                  <h4>{foundPet.identification}</h4>
                  <h4>
                    {foundPet.age} {foundPet.ageUnit}
                  </h4>
                  <h4>{foundPet.description}</h4>
                </div>
              </div>
              {foundPet.creator === userId && (
                <div>
                  <div onClick={() => handleDeleteFoundReport(foundPet._id)}>
                    🗑️
                  </div>

                  <div>
                    <button onClick={() => handleUpdateFoundForm(foundPet._id)}>
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default ProfilPage;
