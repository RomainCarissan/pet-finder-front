import { useAuth } from "../context/AuthContext.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../service/service.js";

function OneLostPetPage() {
  const [oneLossReport, setOneLossReport] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

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

  const { isLoggedIn } = useAuth();

  if (!oneLossReport) {
    return <p>Error: Report not found</p>;
  }

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(oneLossReport.lossDate));

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>OneLossPetPage</h1>
      <button onClick={goBack}>Go Back</button>
      <div>
        <div className="containerOneLossReport">
          <div className="photoReport">
            <img
              className="photo"
              style={{ height: "10rem" }}
              src={oneLossReport.picture}
            />
            <h2>{oneLossReport.petName}</h2>
            <p className="LossPlace">Lost around : {oneLossReport.lossPlace}</p>
            <p className="LossDate"> {formattedDate}</p>
            <p className="Description">
              Description : {oneLossReport.description}
            </p>
            <h4>
              Found by: {oneLossReport.creator.name}{" "}
              {oneLossReport.creator.lastName}
            </h4>
            <h4>
              phone: {oneLossReport.creator.phone} <br />
              address: {oneLossReport.creator.address}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneLostPetPage;
