import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../ReportsPages.css";

function FoundPetPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const toHomePage = () => navigate(`/`);
  const toLostForm = () => navigate(`/lost-pet-form`);
  const [loading, setLoading] = useState(true);
  const [foundReports, setFoundReports] = useState(null);

  //fetch all the found reports so the owner of a lost pet can see if there is any reports about his loss
  async function fetchAllFoundReports() {
    try {
      const response = await myApi.get("/api/foundpets");
      setFoundReports(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAllFoundReports();
  }, []);

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="btnHolder">
        <button onClick={toHomePage} className="backBtn">
          Go Back
        </button>
        <button onClick={toLostForm} className="toReportBtn">
          Report a loss
        </button>
      </div>
      <div className="displayTitleReports">
        <h2>Lastly found pets</h2>
      </div>
      <div className="reportsContainer">
        {foundReports &&
          foundReports.map((foundPet) => {
            return (
              <Link
                key={foundPet._id}
                to={`/found-pet/${foundPet._id}`}
                className="reportCard"
              >
                <div className="reportCard-img">
                  <img src={foundPet.picture} alt={`${foundPet._id} Image`} />
                </div>
                <div className="reportLossCard-info">
                  <h3>{foundPet.petName}</h3>
                  <h4>Found aroud:{foundPet.foundPlace}</h4>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default FoundPetPage;
