import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function SearchPlaceInput({ placeInput, updateCoordinates, defaultValue }) {
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState("");
  const [coordonates, setCoordonates] = useState(null);

  // Debounce function to limit the API calls frequency (1req every 300 max)
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced function for making API calls to fetch suggestions
  const delayedAPICall = debounce((inputValue) => {
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=${
          import.meta.env.VITE_GEOAPIFY_KEY
        } `
      )
      .then((res) => {
        console.log("API Response:", res.data);
        const features = res.data.features;
        if (features.length > 0) {
          const firstFourFeatures = features.slice(0, 4); //get the four first suggestions
          const suggestionCoordinates = [
            features[0].properties.lat,
            features[0].properties.lon,
          ];

          const concatenatedAddresses = firstFourFeatures.map((feature) => {
            const properties = feature.properties;
            const { formatted } = properties;
            return formatted;
          });

          setCoordonates(suggestionCoordinates);
          setSuggestions(concatenatedAddresses);
        }
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, 300); //set the debouce delay

  // useEffect to update the parent component with the coordinates
  useEffect(() => {
    updateCoordinates(coordonates);
  }, [coordonates, updateCoordinates]);

  const handleChange = (e) => {
    // Handle change in the input field
    const inputValue = e.target.value;
    setAddress(inputValue);
    delayedAPICall(inputValue); // Trigger the delayed API call for fetching suggestions
  };

  return (
    <>
      <input
        type="text"
        required="required"
        list="suggestions"
        value={address || (defaultValue !== null ? defaultValue : "")}
        onChange={handleChange}
        ref={placeInput}
      />

      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion}>
            {suggestion}
          </option>
        ))}
      </datalist>
    </>
  );
}

export default SearchPlaceInput;
