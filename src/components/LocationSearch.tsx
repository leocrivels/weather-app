import React from "react";
import { FC, useState } from "react";
import { WeatherLocation } from "../model/Weather";

interface LocationSearchProps {
  onSearch: (search: string) => void;
  previousLocations: WeatherLocation[]|null;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch, previousLocations }) => {
  const [locationSearch, setLocationSearch] = useState("");
  const disableSearch = locationSearch.trim() === "";
  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch('');
  };
  return (
    <div>
      <label>
        Location:
          <input
            list="previousLocations"
            type="text"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />

            <datalist id="previousLocations">
              {previousLocations ? 
                previousLocations.map((location, index)=><option key={index} value={location.name}></option>)
                :
                null
              }
            </datalist>

      </label>
      <button onClick={addLocation} disabled={disableSearch}>
        Search
      </button>
    </div>
  );
};
