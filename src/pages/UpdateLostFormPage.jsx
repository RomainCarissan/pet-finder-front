import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import myApi from "../service/service.js";
import {
  DogFormBreeds,
  DogFormColors,
} from "../components/FormTypes/DogFormType.jsx";
import {
  CatFormBreeds,
  CatFormColors,
} from "../components/FormTypes/CatFormType.jsx";
import ExoticFormBreeds from "../components/FormTypes/ExoticFormType.jsx";

function UpdateLostFormPage() {
  const { user, isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await myApi.get(`/api/lostpets/${id}`);
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
  const lossDateInput = useRef();
  /* const petTypeInput = useRef(); */
  const [petTypeInput, setPetTypeInput] = useState("");
  const petSexInput = useRef();
  const sterilizedInput = useRef();
  const identificationInput = useRef();
  const mixedInput = useRef();
  const colorsInput = useRef();
  const breedInput = useRef();
  const ageInput = useRef();
  const ageUnitInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const lossPlaceInput = useRef();

  // Ensure that petData is available before setting the value of petTypeInput
  useEffect(() => {
    if (petData) {
      setPetTypeInput(petData["petType"]);
    }
  }, [petData]);

  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  async function handleUpdateSubmit(event) {
    event.preventDefault();

    const petName = petNameInput.current.value;
    const lossDate = lossDateInput.current.value;
    /* const petType = petTypeInput.current.value; */
    const petSex = petSexInput.current.value;
    const sterilized = sterilizedInput.current.value;
    const identification = identificationInput.current.value;
    const breed = breedInput.current.value;
    const mixed = mixedInput.current.value;
    const colors = colorsInput.current.value;
    const age = ageInput.current.value;
    const ageUnit = ageUnitInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const lossPlace = lossPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("lossDate", lossDate);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("sterilized", sterilized);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("mixed", mixed);
    fd.append("colors", colors);
    fd.append("age", age);
    fd.append("ageUnit", ageUnit);
    fd.append("picture", picture);
    fd.append("description", description);
    fd.append("lossPlace", lossPlace);

    try {
      const response = await myApi.put(`/api/lostpets/${id}`, fd);
      console.log("lost-pet updated", response);
      navigate(`/lost-pet/${id}`);
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
      <h1>Update Loss Report</h1>
      <div>
        <form onSubmit={handleUpdateSubmit}>
          <div>
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              defaultValue={petData["petName"]}
              placeholder="The name of your pet"
            />
          </div>

          <div>
            <label htmlFor="lossDate">Loss Date: </label>
            <input
              type="date"
              ref={lossDateInput}
              id="lossDate"
              defaultValue={petData["lossDate"]}
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
              <option value="">Select your response</option>
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
              <option value="">Select your response</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="sterilized">Sterilized: </label>
            <select
              ref={sterilizedInput}
              id="sterilized"
              required="required"
              defaultValue={petData["sterilized"]}
            >
              <option value="">Select your response</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
            <label htmlFor="breed">Breed: </label>
            <select
              type="text"
              ref={breedInput}
              id="breed"
              defaultValue={petData["breed"]}
            >
              {petTypeInput === "" && (
                <option value="">Select the type of pet first</option>
              )}
              {petTypeInput === "Cat" && <CatFormBreeds></CatFormBreeds>}
              {petTypeInput === "Dog" && <DogFormBreeds></DogFormBreeds>}
              {petTypeInput === "Exotic" && (
                <ExoticFormBreeds></ExoticFormBreeds>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="mixed">Mixed Breed: </label>
            <select
              ref={mixedInput}
              id="mixed"
              required="required"
              defaultValue={petData["mixed"]}
            >
              <option value="">Select your response</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="colors">Colors: </label>
            <select
              type="text"
              ref={colorsInput}
              id="colors"
              required="required"
              defaultValue={petData["colors"]}
            >
              {petTypeInput === "" && (
                <option value="">Select the type of pet first</option>
              )}
              {petTypeInput === "Cat" && <CatFormColors></CatFormColors>}
              {petTypeInput === "Dog" && <DogFormColors></DogFormColors>}
              {petTypeInput === "Exotic" && <option value="">None</option>}
            </select>
          </div>

          <div>
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              ref={ageInput}
              id="age"
              required="required"
              defaultValue={petData["age"]}
              placeholder="The age of your pet"
            />

            <label htmlFor="ageUnit"></label>
            <select
              ref={ageUnitInput}
              id="ageUnit"
              required="required"
              defaultValue={petData["ageUnit"]}
            >
              <option value="">Y/M ?</option>
              <option value="year(s)">Year(s)</option>
              <option value="month(s)">Month(s)</option>
            </select>
          </div>

          <div>
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" multiple />
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

          <div>
            <label htmlFor="lossPlace">Loss Place: </label>
            <input
              type="text"
              ref={lossPlaceInput}
              id="lossPlace"
              defaultValue={petData["lossPlace"]}
            />
          </div>

          <div>
            <button type="submit">Save Changes</button>
          </div>
          <p className="error">{error}</p>
        </form>
      </div>
    </>
  );
}

export default UpdateLostFormPage;
