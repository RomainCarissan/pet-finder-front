import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../OneReportPages.css";

function OneLostPetPage() {
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/lost-pet`);
  };

  const [loading, setLoading] = useState(true);
  const [oneLossReport, setOneLossReport] = useState(null);

  //get the id from the url to get on specific loss report
  async function fetchOneLossReport() {
    try {
      const response = await myApi.get(`/api/lostpets/${params.id}`);
      setOneLossReport(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the lost pet report:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOneLossReport();
  }, [params.id]); // Fetch the lost pet report when the component mounts or when the ID changes

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
  if (!oneLossReport) {
    return <p className="errorReport">Error: Report not found</p>;
  }
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(oneLossReport.lossDate));
  return (
    <>
      <div className="oneReportPage">
        <h1>Have you seen {oneLossReport.petName}?</h1>
        <button onClick={goBack} className="backBtn">
          Go Back
        </button>
        <div className="containerOneReport">
          <div className="photoReport">
            <img
              className="photo"
              src={oneLossReport.picture}
              alt={`${oneLossReport.petName} Image`}
            />
          </div>
          <div className="infoReport">
            <h2 className="infoLossName">{oneLossReport.petName}</h2>
            <p className="oneReportPlace">
              Lost around {oneLossReport.lossPlace}
            </p>
            <p className="oneReportDate">Since : {formattedDate}</p>
            <p className="OneReportDescription">{oneLossReport.description}</p>
            <div className="creatorInfo">
              <h4>
                Owned by: {oneLossReport.creator.name}{" "}
                {oneLossReport.creator.lastName}
                <br />
                Phone: {oneLossReport.creator.phone} <br />
                Address: {oneLossReport.creator.address}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneLostPetPage;
