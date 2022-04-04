import React, { useEffect, useState } from "react";
import "./App.css";
import { LocationSearch } from "./LocationSearch";
import { WeatherLocation } from "../model/Weather";
import { searchLocation, getLocationByCoord } from "../services/WeatherService";

import { WeatherSummary } from "./WeatherSummary";
import {
  Button,
  FlexCentered,
  ToolBarWrapper,
  Error,
  Warning,
  IdleDiv,
} from "../styles/basicComponents";

function App() {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);
  const [tempScale, setTempScale] = useState<"C" | "F">("C");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  /**
   * Resets error and warning messages
   */
  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  /**
   * Add location to the list of locations and set the current location to the new location
   * @param term
   */
  const addLocation = async (term: string) => {
    resetAlerts();

    const item = locations.find((item) => item.name === term);
    if (item) {
      setCurrentLocation(item);
    } else {
      const location = await searchLocation(term);

      if (location) {
        setLocations([location, ...locations]);
        setCurrentLocation(location);
      } else {
        setError(`Location '${term}' not found.`);
      }
    }
  };

  /**
   * Try to get the user coordinates to set the current location
   */
  useEffect(() => {
    if (!currentLocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const city = await getLocationByCoord(
          position.coords.latitude,
          position.coords.longitude
        );
        if (city) {
          const location = await searchLocation(
            `${city[0].name}, ${city[0].state}, ${city[0].country}`
          );
          if (location) {
            setCurrentLocation(location);
          }
        }
      });
    }
  });

  return (
    <div style={{ backgroundColor: "#F9F8F8" }}>
      <ToolBarWrapper>
        Weather App
        {currentLocation && (
          <Button onClick={() => setTempScale(tempScale === "C" ? "F" : "C")}>
            Change to °{tempScale === "C" ? "F" : "C"}
          </Button>
        )}
      </ToolBarWrapper>
      <div>
        <FlexCentered
          style={{ backgroundColor: "#767B91", padding: "4px 0px" }}
        >
          <LocationSearch
            onSearch={addLocation}
            previousLocations={locations}
          />
        </FlexCentered>
        {error ? <Error>{error}</Error> : null}
        {warning ? <Warning>{warning}</Warning> : null}
        {currentLocation ? (
          <WeatherSummary location={currentLocation} tempScale={tempScale} />
        ) : (
          <IdleDiv>
            Search for the location you want to see the weather.
          </IdleDiv>
        )}
      </div>
    </div>
  );
}

export default App;
