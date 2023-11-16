import { useAuth } from "../../../context/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../../service/service.js";

function OneFoundPetPage() {
  const [oneFoundReport, setOneFoundReport] = useState(null);
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/found-pet`);
  };

  async function fetchOneFoundReport() {
    try {
      const response = await myApi.get(`/api/foundpets/${params.id}`);
      setOneFoundReport(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOneFoundReport();
  }, [params.id]);

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  if (!oneFoundReport) {
    return <p className="errorReport">Error: report not found</p>;
  }

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(oneFoundReport.foundDate));

  return (
    <>
      <div className="oneReportPage">
        <h1>{oneFoundReport.petName} has been found!</h1>
        <button onClick={goBack} className="backBtn">
          Go Back
        </button>
        <div className="containerOneReport">
          <div className="photoReport">
            <img className="photo" src={oneFoundReport.picture} />
          </div>
          <div className="infoReport">
            <h2 className="infoFoundName">{oneFoundReport.petName}</h2>
            <p className="oneReportPlace">
              Found around : {oneFoundReport.foundPlace}
            </p>
            <p className="oneReportDate"> {formattedDate}</p>
            <p className="OneReportDescription">
              Description : {oneFoundReport.description}
            </p>
            <div className="creatorInfo">
              <h4>
                Found by: {oneFoundReport.creator.name}{" "}
                {oneFoundReport.creator.lastName}
                <br />
                phone: {oneFoundReport.creator.phone} <br />
                address: {oneFoundReport.creator.address}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneFoundPetPage;
