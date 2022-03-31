import { FC, useEffect, useState } from "react";
import { Weather, WeatherLocation } from "../model/Weather";
import { readForecast, readWeather } from "../services/WeatherService";
import { WeatherEntry } from "./WeatherEntry";

interface WeatherSummaryProps {
    location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Weather[] | null>(null);
    const [tempScale, setTempScale] = useState<"C"|"F">("C");

    useEffect(() => {
        (async function () {
            if (location) {
                const [weather, forecast] = await Promise.all([
                    readWeather(location.id, tempScale === "C" ? "metric" : "imperial"),
                    readForecast(location.id, tempScale === "C" ? "metric" : "imperial")
                ]);
                setWeather(weather);
                setForecast(forecast);
            }
        })();
    }, [location, tempScale]);

    if (!location || !weather || !forecast) return null;

    return (
        <div>
          <hr/>
          <button onClick={()=> setTempScale(tempScale === 'C'? "F":"C")}>Change to °{tempScale === 'C'? "F":"C"}</button>
          <h2>{location.name}</h2>
          <WeatherEntry weather={weather} tempScale={tempScale}/>
          <h2>Forecast</h2>
          <div>
            <ol>
              {forecast.map(timePoint =>
                <li key={timePoint.dt}>
                  <WeatherEntry weather={timePoint} tempScale={tempScale}/>
                </li>
              )}
            </ol>
          </div>
        </div>
      );
};