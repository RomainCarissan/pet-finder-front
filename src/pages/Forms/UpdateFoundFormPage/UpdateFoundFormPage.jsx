import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../PetFormPage.css";
import SearchPlaceInput from "../../../components/SearchPlaceInput/SearchPlaceInput.jsx";
import { DogFormColors } from "../../../components/FormTypes/DogFormType.jsx";
import { CatFormColors } from "../../../components/FormTypes/CatFormType.jsx";
import ExoticFormBreeds from "../../../components/FormTypes/ExoticFormType.jsx";

function UpdateFoundFormPage() {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [petData, setPetData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await myApi.get(`/api/foundpets/${id}`);
        setPetData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
        setError("Failed to fetch previous pet data");
      }
    };
    fetchPetData();
  }, [id]);

  const petNameInput = useRef();
  const foundDateInput = useRef();
  const [petTypeInput, setPetTypeInput] = useState("");
  const petSexInput = useRef();
  const identificationInput = useRef();
  const colorsInput = useRef();
  const breedInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const reportPlaceInput = useRef();
  const [coordonates, setCoordinates] = useState(null); //the 2 states are getting their value through the componant
  const [defaultPlace, setDefaultPlace] = useState(null); //it allows to get back previous data or update it

  // Ensure that petData is available before setting the value of petTypeInput
  useEffect(() => {
    if (petData) {
      setPetTypeInput(petData["petType"]);
      setDefaultPlace(petData["foundPlace"]);
    }
  }, [petData]);

  // Update the coordonates when they are changed in the the componant searchPlaceInput
  const updateCoordinates = (coord) => {
    setCoordinates(coord);
    console.log(coord);
  };

  // Update the list of breeds and colors depending on the petType chosen
  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  async function handleUpdateSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const foundDate = foundDateInput.current.value;
    const petSex = petSexInput.current.value;
    const identification = identificationInput.current.value;
    const breed = breedInput.current.value;
    const colors = colorsInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const reportPlace = reportPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("colors", colors);
    fd.append("description", description);
    fd.append("foundPlace", reportPlace);
    if (foundDate) {
      fd.append("foundDate", foundDate);
    }
    if (coordonates) {
      fd.append("latLon", coordonates);
    }
    if (picture) {
      fd.append("picture", picture);
    }

    try {
      const response = await myApi.put(`/api/foundpets/${id}`, fd);
      console.log("found-pet added", response);
      navigate(`/found-pet/${id}`);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

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
  if (!petData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="reportPetFormContainer">
        <h1>Update you report...</h1>
        <form onSubmit={handleUpdateSubmit} className="reportPetForm">
          <div className="formField">
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              required="required"
              defaultValue={petData["petName"]}
              placeholder="The name of the pet"
            />
          </div>
          <div className="formField">
            <label htmlFor="foundDate">Found Date: </label>
            <input
              type="date"
              ref={foundDateInput}
              id="foundDate"
              defaultValue={petData["foundDate"]}
            />
          </div>
          <div className="formField">
            <label htmlFor="petType">Type of Pet: </label>
            <select
              value={petTypeInput}
              id="petType"
              required="required"
              onChange={handlePetTypeChange}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
            </select>
          </div>
          <div className="formField">
            <label htmlFor="petSex">Pet Sex: </label>
            <select
              ref={petSexInput}
              id="petSex"
              required="required"
              defaultValue={petData["petSex"]}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="I don't know">I don't know</option>
            </select>
          </div>
          <div className="formField">
            <label htmlFor="breed">Breed: </label>
            <select
              type="text"
              ref={breedInput}
              id="breed"
              defaultValue={petData["breed"]}
            >
              {petTypeInput !== "Exotic" && (
                <option value="">No need to specify</option>
              )}
              {petTypeInput === "Exotic" && (
                <ExoticFormBreeds></ExoticFormBreeds>
              )}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="identification">Identification: </label>
            <input
              type="text"
              ref={identificationInput}
              id="identification"
              defaultValue={petData["identification"]}
              placeholder="Tatoo or Chip number"
            />
          </div>
          <div className="formField">
            <label htmlFor="colors">Colors: </label>
            <select
              type="text"
              ref={colorsInput}
              id="colors"
              defaultValue={petData["colors"]}
              required="required"
            >
              {petTypeInput === "" && (
                <option value="">Select the type of pet first</option>
              )}
              {petTypeInput === "Cat" && <CatFormColors></CatFormColors>}
              {petTypeInput === "Dog" && <DogFormColors></DogFormColors>}
              {petTypeInput === "Exotic" && <option value="none">None</option>}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" />
          </div>
          <div className="formField">
            <label htmlFor="description">Description: </label>
            <textarea
              rows="3"
              cols="25"
              ref={descriptionInput}
              id="description"
              defaultValue={petData["description"]}
              placeholder="Add additional informations you would like to provide"
            ></textarea>
          </div>
          <div className="formField">
            <label htmlFor="reportPlace">Found Place: </label>
            <SearchPlaceInput
              placeInput={reportPlaceInput}
              updateCoordinates={updateCoordinates}
              defaultValue={defaultPlace}
            ></SearchPlaceInput>
          </div>
          <div className="formField">
            <button type="submit" className="submitBtn">
              Save Changes
            </button>
            <button className="cancelBtn" onClick={goBack}>
              Cancel
            </button>
          </div>
          <p className="error">{error}</p>
        </form>
      </div>
    </>
  );
}

export default UpdateFoundFormPage;
