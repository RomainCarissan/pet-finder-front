import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useParams } from "react";
import myApi from "../service/service";

function OneLostPetPage() {
  const [oneLossReport, setOneLossReport] = useState(null);
  const params = useParams();

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
    return <p>Error: Receipe not found</p>;
  }

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  return (
    <>
      <h1>OnePetPage</h1>
      <div>
        <div className="containerOneLossReport">
          <div className="photoReport">
            <img className="photo" src={oneLossReport.picture} />
            <h2>{oneLossReport.petName}</h2>
            <p className="LossPlace">Lost around : {oneLossReport.lossPlace}</p>
            <p className="LossDate"> {oneLossReport.lossDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneLostPetPage;
