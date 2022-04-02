import React, {FC} from "react";
import {Weather} from "../model/Weather";
import {getIconUrl} from "../services/WeatherService";
import {convertUnixTimeToDate} from "../utils/DateTimeHelper"

interface WeatherEntryProps {
    weather: Weather;
    tempScale: "C" | "F";
}

export const WeatherEntry: FC<WeatherEntryProps> = ({weather, tempScale}) =>
 <div style={{alignSelf: 'flex-start', margin: '0px 5px', boxShadow: '-1px 1px 3px 1px black', border: 'solid', padding: '4px', textAlign: 'center', backgroundColor: 'white'}}>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>
    {weather.weather.map(condition =>
      <div key={condition.id} style={{marginBlockEnd: '0.83em'}}>
        <img src={getIconUrl(condition.icon)} alt={condition.main}/> 
        <div style={{fontSize: '1.17em', fontWeight: 'Bold'}}>{condition.main}</div>
        <div>{condition.description}</div>
      </div>)
    }
    <div>
      <strong style={{fontSize: '1.5em', fontWeight: 'Bold'}}>{weather.main.temp}°{tempScale}</strong>
      <div>({weather.main.temp_min}°{tempScale} / {weather.main.temp_max}°{tempScale})</div>
    </div>
    <div>Humidity: {weather.main.humidity}%</div>
  </div>;