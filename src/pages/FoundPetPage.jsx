import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../service/service.js";

function FoundPetPage() {
  const [foundReports, setFoundReports] = useState(null);

  //fetch all the found reports so the owner of a lost pet can see if there is any reports about his loss
  async function fetchAllFoundReports() {
    try {
      const response = await myApi.get("/api/foundpets");
      setFoundReports(response.data); //I can add filter to is lost = true
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllFoundReports();
  }, []);

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return (
    <>
      <div>
        <Link to="/lost-pet-form">
          <button>Report a loss</button>
        </Link>
      </div>
      <div>
        <h2>Lastly found pets</h2>
      </div>
      <div className="container">
        {foundReports &&
          foundReports.map((foundPet) => {
            return (
              <Link
                key={foundPet._id}
                to={`/found-pet/${foundPet._id}`}
                //data-hidden={foundPet.data_hidden ? foundPet.data_hidden : "false"}
              >
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
                    <h4>Found aroud:{foundPet.foundPlace}</h4>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default FoundPetPage;
