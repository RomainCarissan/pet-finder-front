import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../OneReportPages.css";

function OneLostPetPage() {
  const [oneLossReport, setOneLossReport] = useState(null);
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/lost-pet`);
  };

  async function fetchOneLossReport() {
    try {
      const response = await myApi.get(`/api/lostpets/${params.id}`);
      setOneLossReport(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOneLossReport();
  }, [params.id]);

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
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
            <img className="photo" src={oneLossReport.picture} />
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
                Found by: {oneLossReport.creator.name}{" "}
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
