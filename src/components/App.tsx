import React, {useState} from 'react';
import {LocationSearch} from "./LocationSearch";
import {LocationTable} from "./LocationTable";
import {WeatherLocation, Coordinates} from '../model/Weather';
import {searchLocation} from '../services/WeatherService'

import './App.css';
import { WeatherSummary } from './WeatherSummary';

function App() {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
  //const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  //var count:number = 0;
  const resetAlerts = () => {
    setError('');
    setWarning('');
  }
  const addLocation = async (term: string) => {
    resetAlerts();
    
    //setLocations([location, ...locations]);
    const item = locations.find(item => item.name === term)
    if (item) {
      console.log('item found', item)
      setCurrentLocation(item)
    } else {
      const location = await searchLocation(term);
      /*const location = {
                          coord: {lon: 1, lat: 1} as Coordinates,
                          id: locations.length,
                          name: term
                        } as WeatherLocation*/
      console.log('location', location, locations.length)
      if (location) {
        setLocations([location, ...locations]);
        setCurrentLocation(location)
      } else {
        setError(`Location '${term}' not found.`);
      }
    }
  }
    

  return (
    <div>
      <h1>Weather App</h1>

      <LocationSearch onSearch={addLocation} previousLocations={locations}/>
      {
        error
          ? <div>{error}</div>
          : null
      }
      {
        warning
          ? <div>{warning}</div>
          : null
      }
      
      {/*<LocationTable locations={locations} current={currentLocation} onSelect={location => setCurrentLocation(location)}/>*/}
      <WeatherSummary location={currentLocation}/>
    </div>
  );
}

export default App;
