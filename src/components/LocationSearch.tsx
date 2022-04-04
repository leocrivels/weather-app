import React from "react";
import { FC, useState } from "react";
import { WeatherLocation } from "../model/Weather";
import styled, {css} from "styled-components";

const Input = styled.input``;
const Button = styled.button`background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0.5em 1em;
padding: 0.25em 1em;`;
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
          <Input
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
      <Button onClick={addLocation} disabled={disableSearch}>
        Search
      </Button>
    </div>
  );
};
