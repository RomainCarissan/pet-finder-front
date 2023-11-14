import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../service/service.js";

function OneFoundPetPage() {
  const [oneFoundReport, setOneFoundReport] = useState(null);
  const params = useParams();

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

  const { isLoggedIn } = useAuth();

  if (!oneFoundReport) {
    return <p>Error: report not found</p>;
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
      <h1>OneFoundPetPage</h1>
      <div>
        <div className="containerOneFoundReport">
          <div className="photoReport">
            <img
              className="photo"
              style={{ height: "10rem" }}
              src={oneFoundReport.picture}
            />
            <h2>{oneFoundReport.petName}</h2>
            <p className="FoundPlace">
              Found around : {oneFoundReport.foundPlace}
            </p>
            <p className="FoundDate"> {oneFoundReport.foundDate}</p>
            <p className="Description">
              Description : {oneFoundReport.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneFoundPetPage;
