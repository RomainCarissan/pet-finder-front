import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../ReportsPages.css";

function LostPetPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const toHomePage = () => navigate(`/`);
  const toFoundForm = () => navigate(`/found-pet-form`);
  const [lossReports, setLossReports] = useState(null);

  //fetch all the loss report so the founder can see if there is any reports about the pet he found
  async function fetchAllLossReports() {
    try {
      const response = await myApi.get("/api/lostpets");
      setLossReports(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllLossReports();
  }, []);

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return (
    <>
      <div className="btnHolder">
        <button onClick={toHomePage} className="backBtn">
          Go Back
        </button>
        <button onClick={toFoundForm} className="toReportBtn">
          Report a found
        </button>
      </div>
      <div className="displayTitleReports">
        <h2>Lastly lost pets</h2>
      </div>
      <div className="reportsContainer">
        {lossReports &&
          lossReports.map((lostPet) => {
            return (
              <Link
                key={lostPet._id}
                to={`/lost-pet/${lostPet._id}`}
                className="reportCard"
              >
                <div className="reportCard-img">
                  <img src={lostPet.picture} alt={`${lostPet._id} Image`} />
                </div>
                <div className="reportFoundCard-info">
                  <h3>{lostPet.petName}</h3>
                  <h4>lost around: {lostPet.lossPlace}</h4>
                  {/* <h4>{lostPet.lossDate}</h4> */}
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default LostPetPage;
