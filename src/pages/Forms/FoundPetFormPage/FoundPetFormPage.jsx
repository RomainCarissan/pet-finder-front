import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import myApi from "../../../service/service.js";
import "../PetFormPage.css";
import SearchPlaceInput from "../../../components/SearchPlaceInput/SearchPlaceInput.jsx";
import { DogFormColors } from "../../../components/FormTypes/DogFormType.jsx";
import { CatFormColors } from "../../../components/FormTypes/CatFormType.jsx";
import ExoticFormBreeds from "../../../components/FormTypes/ExoticFormType.jsx";

function FoundPetFormPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const petNameInput = useRef();
  const foundDateInput = useRef();
  const [petTypeInput, setPetTypeInput] = useState("-1");
  const petSexInput = useRef();
  const identificationInput = useRef();
  /* const breedInput = useRef();
  const colorsInput = useRef(); */
  const [colors, setColors] = useState("-1");
  const [breed, setBreed] = useState("-1");
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const reportPlaceInput = useRef(); //the 2 states are getting their value through the componant
  const [coordonates, setCoordinates] = useState(null);

  // Update the coordonates when they are changed in the the componant searchPlaceInput
  const updateCoordinates = (coord) => {
    setCoordinates(coord);
  };

  // Update the list of breeds and colors depending on the petType chosen
  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  const handleColorsChange = (e) => {
    setColors(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const foundDate = foundDateInput.current.value;
    const petSex = petSexInput.current.value;
    const identification = identificationInput.current.value;
    /* const breed = breedInput.current.value;
    const colors = colorsInput.current.value; */
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const reportPlace = reportPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("foundDate", foundDate);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("colors", colors);
    fd.append("picture", picture);
    fd.append("description", description);
    fd.append("foundPlace", reportPlace);
    fd.append("latLon", coordonates);
    /* fd.append("lat", coordonates[0]);
    fd.append("lon", coordonates[1]); */ //if you want to get the coord individualy

    try {
      const response = await myApi.post("/api/foundpets", fd);
      console.log("found-pet added", response);
      navigate("/found-pet");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="reportPetFormContainer">
        <h1>Report a found pet!</h1>
        <form onSubmit={handleSubmit} className="reportPetForm">
          <div className="formField">
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              required="required"
              placeholder="The name of the pet"
            />
          </div>

          <div className="formField">
            <label htmlFor="foundDate">Found Date: </label>
            <input type="date" ref={foundDateInput} id="foundDate" />
          </div>

          <div className="formField">
            <label htmlFor="petType">Type of Pet: </label>
            <select
              value={petTypeInput}
              id="petType"
              required="required"
              onChange={handlePetTypeChange}
            >
              <option value="-1" disabled>
                Select your response
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="petSex">Pet Sex: </label>
            <select ref={petSexInput} id="petSex" required="required">
              <option selected disabled>
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
              /* ref={breedInput} */ value={breed}
              onChange={handleBreedChange}
              id="breed"
            >
              {petTypeInput === "-1" && (
                <option value="-1" disabled>
                  Select the type of pet first
                </option>
              )}
              {petTypeInput !== "Exotic" && (
                <option value="" disabled>
                  No need to specify
                </option>
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
              placeholder="Tatoo or Chip number"
            />
          </div>

          <div className="formField">
            <label htmlFor="colors">Colors: </label>
            <select
              type="text"
              /* ref={colorsInput} */
              value={colors}
              onChange={handleColorsChange}
              id="colors"
              required="required"
            >
              {petTypeInput === "-1" && (
                <option value="-1" disabled>
                  Select the type of pet first
                </option>
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
              placeholder="Add additional informations you would like to provide"
            ></textarea>
          </div>

          <div className="formField">
            <label htmlFor="reportPlace">Found Place: </label>
            <SearchPlaceInput
              placeInput={reportPlaceInput}
              updateCoordinates={updateCoordinates}
            ></SearchPlaceInput>
          </div>
          <div className="formField">
            <button type="submit" className="submitBtn">
              Submit
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

export default FoundPetFormPage;
