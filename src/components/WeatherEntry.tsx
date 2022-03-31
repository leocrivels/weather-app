import React, {FC} from "react";
import {Weather} from "../model/Weather";
import {getIconUrl} from "../services/WeatherService";

interface WeatherEntryProps {
    weather: Weather;
    tempScale: "C" | "F";
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherEntry: FC<WeatherEntryProps> = ({weather, tempScale}) =>
 <div>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleString()}</div>
    <div>
      <strong>{weather.main.temp}°{tempScale}</strong>
      <div>({weather.main.temp_min}°{tempScale} / {weather.main.temp_max}°{tempScale})</div>
    </div>
    <div>Humidity: {weather.main.humidity}%</div>
    {weather.weather.map(condition =>
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main}/> {condition.main} {condition.description}
      </div>)
    }
  </div>;