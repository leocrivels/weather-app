import React from "react";
import { FC, useState } from "react";
import { WeatherLocation } from "../model/Weather";
import { Button, Input } from "../styles/basicComponents";

interface LocationSearchProps {
  onSearch: (search: string) => void;
  previousLocations: WeatherLocation[] | null;
}

/**
 * Search for a location by name and lists the previous locations
 * @param {
 *   onSearch,
 *   previousLocations,
 * }
 * @returns
 */
export const LocationSearch: FC<LocationSearchProps> = ({
  onSearch,
  previousLocations,
}) => {
  const [locationSearch, setLocationSearch] = useState("");
  const disableSearch = locationSearch.trim() === "";
  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch("");
  };
  return (
    <div>
      <label>
        <Input
          list="previousLocations"
          type="text"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />

        <datalist id="previousLocations">
          {previousLocations
            ? previousLocations.map((location, index) => (
                <option key={index} value={location.name}></option>
              ))
            : null}
        </datalist>
      </label>
      <Button onClick={addLocation} disabled={disableSearch}>
        Search
      </Button>
    </div>
  );
};
