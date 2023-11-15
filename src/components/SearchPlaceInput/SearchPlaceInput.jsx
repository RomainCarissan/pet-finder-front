import { useRef, useState } from "react";
import { useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import myGeoApikey from "../../service/service.js";
import axios from "axios";
function SearchPlaceInput({ placeInput, updateCoordinates, defaultValue }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [selectedAddress, setSelectedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [coordonates, setCoordonates] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const delayedAPICall = debounce((inputValue) => {
    setLoading(true);
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=211d3fb8da2745ef80e459dee5d35c87 `
      )
      .then((res) => {
        console.log("API Response:", res.data);
        const features = res.data.features;
        if (features.length > 0) {
          //const properties = features[0].properties;
          const firstFourFeatures = features.slice(0, 4);
          const suggestionCoordinates = [
            features[0].properties.lat,
            features[0].properties.lon,
          ];
          /*const { housenumber, street, county, city, country, lon, lat } =
            properties;

           console.log("House Number:", properties.housenumber);
          console.log("Street:", properties.street);
          console.log("City:", city);
          console.log("County:", properties.county); 
          console.log("Longitude:", lon);
          console.log("Latitude:", lat);*/

          /* const concatenatedAddress = [
            housenumber,
            street,
            city,
            county,
            country,
          ] 
            .filter((value) => value !== undefined && value !== null)
            .join(" ");

          setSuggestions([concatenatedAddress]); */
          const concatenatedAddresses = firstFourFeatures.map((feature) => {
            const properties = feature.properties;
            const {
              /* housenumber,
              street,
              county,
              city,
              country,
              lat,
              lon,
              name, */
              formatted,
            } = properties;

            /* return [name, housenumber, street, city, county, country]
              .filter((value) => value !== undefined && value !== null)
              .join(" "); */
            return formatted;
          });

          setCoordonates(suggestionCoordinates);
          setSuggestions(concatenatedAddresses);
        }
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    updateCoordinates(coordonates);
  }, [coordonates, updateCoordinates]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    delayedAPICall(inputValue);
  };

  return (
    <>
      <input
        type="text"
        list="suggestions"
        /* value={
          address === "" ? (defaultValue !== null ? defaultValue : "") : ""
        } */
        //value={defaultValue !== null ? address : ""}
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
