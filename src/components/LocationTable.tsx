import React, {FC, useEffect} from "react";
import {WeatherLocation} from '../model/Weather';

interface LocationTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export const LocationTable: FC<LocationTableProps> = ({locations, onSelect, current}) =>
{
  useEffect(()=>{
    console.log('asasas',locations)
  });
return <>
  <div>
    <h2>Locations</h2>
    <table className="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      {locations.map((location, index) =>
        <tr key={index} style={{color: current?.id === location.id ? 'green':'grey', fontSize: current?.id === location.id ? 20:15}}
        onClick={() => onSelect(location)}>
          <td>{location.name}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
  </>
}