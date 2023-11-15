import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import myApi from "../service/service.js";
import SearchPlaceInput from "../components/SearchPlaceInput/SearchPlaceInput.jsx";
import { DogFormColors } from "../components/FormTypes/DogFormType.jsx";
import { CatFormColors } from "../components/FormTypes/CatFormType.jsx";
import ExoticFormBreeds from "../components/FormTypes/ExoticFormType.jsx";

function UpdateFoundFormPage() {
  const { user, isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await myApi.get(`/api/foundpets/${id}`);
        setPetData(response.data);
      } catch (error) {
        console.log(error.response);
        setError("Failed to fetch previous pet data");
      }
    };
    fetchPetData();
  }, [id]);

  const islostState = useState("true");
  const petNameInput = useRef();
  const foundDateInput = useRef();
  /* const petTypeInput = useRef(); */
  const [petTypeInput, setPetTypeInput] = useState("");
  const petSexInput = useRef();
  /*  const sterilizedInput = useRef(); */
  const identificationInput = useRef();
  /* const mixedInput = useRef(); */
  const colorsInput = useRef();
  const breedInput = useRef();
  const ageInput = useRef();
  const ageUnitInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const reportPlaceInput = useRef();
  const [coordonates, setCoordinates] = useState(null);

  // Ensure that petData is available before setting the value of petTypeInput
  useEffect(() => {
    if (petData) {
      setPetTypeInput(petData["petType"]);
    }
  }, [petData]);

  const defaultPlace = {
    LossForm: petData["lossPlace"],
    FoundForm: petData["foundPlace"],
  };
  const updateCoordinates = (coord) => {
    setCoordinates(coord);
    console.log(coord);
  };
  console.log(coordonates);

  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  async function handleUpdateSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const lossDate = foundDateInput.current.value;
    /* const petType = petTypeInput.current.value; */
    const petSex = petSexInput.current.value;
    /* const sterilized = sterilizedInput.current.value; */
    const identification = identificationInput.current.value;
    const breed = breedInput.current.value;
    /* const mixed = mixedInput.current.value; */
    const colors = colorsInput.current.value;
    const age = ageInput.current.value;
    const ageUnit = ageUnitInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const reportPlace = reportPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("lossDate", lossDate);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    /* fd.append("sterilized", sterilized); */
    fd.append("identification", identification);
    fd.append("breed", breed);
    /*  fd.append("mixed", mixed); */
    fd.append("colors", colors);
    fd.append("age", age);
    fd.append("ageUnit", ageUnit);
    fd.append("description", description);
    fd.append("foundPlace", reportPlace);
    fd.append("latLon", coordonates);
    if (picture) {
      fd.append("picture", picture);
    }

    try {
      const response = await myApi.put(`/api/foundpets/${id}`, fd);
      console.log("found-pet added", response);
      navigate(`foundpets/${id}`);
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
  if (!petData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>foundPetFormPage</h1>
      <div>
        <form onSubmit={handleUpdateSubmit}>
          <div>
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              defaultValue={petData["petName"]}
              placeholder="The name of the pet"
            />
          </div>

          <div>
            <label htmlFor="foundDate">Found Date: </label>
            <input
              type="date"
              ref={foundDateInput}
              id="foundDate"
              defaultValue={petData["foundDate"]}
            />
          </div>

          <div>
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
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
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

          <div>
            <label htmlFor="breed">Breed: </label>
            <select
              type="text"
              ref={breedInput}
              id="breed"
              defaultValue={petData["breed"]}
            >
              {petTypeInput == !"Exotic" && (
                <option value="">No need to specify</option>
              )}
              {petTypeInput === "Exotic" && (
                <ExoticFormBreeds></ExoticFormBreeds>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="identification">Identification: </label>
            <input
              type="text"
              ref={identificationInput}
              id="identification"
              defaultValue={petData["identification"]}
              placeholder="Tatoo or Chip number"
            />
          </div>

          <div>
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

          <div>
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" />
          </div>

          <div>
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

          {/* <div>
            <label htmlFor="foundPlace">Found Place: </label>
            <input type="text" ref={reportPlaceInput} id="foundPlace" />
          </div> */}
          <div>
            <label htmlFor="reportPlace">Found Place: </label>
            <SearchPlaceInput
              placeInput={reportPlaceInput}
              updateCoordinates={updateCoordinates}
              defaultValue={defaultPlace.LossForm || defaultPlace.FoundForm}
            ></SearchPlaceInput>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <p className="error">{error}</p>
        </form>

        {/*         {errorMessage && <p className="error-message">{errorMessage}</p>}
         */}
      </div>
    </>
  );
}

export default UpdateFoundFormPage;
