import { FC, useEffect, useState } from "react";
import { Weather, WeatherLocation } from "../model/Weather";
import { readForecast, readWeather } from "../services/WeatherService";
import { WeatherEntry } from "./WeatherEntry";
import { TempChart } from "./TempChart";
import "../utils/DateTimeHelper"
import { convertUnixTimeToDate } from "../utils/DateTimeHelper";

interface WeatherSummaryProps {
    location: WeatherLocation | null;
}

interface ForecastsByDay {
    forecasts: Weather[];
    dt: number;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Weather[] | null>(null);
    const [tempScale, setTempScale] = useState<"C"|"F">("C");
    const [forecastsByDay, setForecastsByDay] = useState<ForecastsByDay[]>([]);
    const [filteredForecast, setFilteredForecast] = useState<Weather[] | null>(null);

    useEffect(() => {
        if (forecast) {
            let nextDay:Date = convertUnixTimeToDate(forecast[0].dt);
            nextDay.setDate(nextDay.getDate() + 1);
            nextDay.setHours(0,0,0,0)
            let forecastsByDay:ForecastsByDay[] = [];
            let currentDayForecasts:Weather[] = []
            forecast.forEach(element => {
                const elementDate = convertUnixTimeToDate(element.dt)
                if (elementDate < nextDay) {
                    currentDayForecasts.push(element);
                } else {
                    forecastsByDay.push({forecasts: currentDayForecasts, dt: convertUnixTimeToDate(currentDayForecasts[0].dt).setHours(0,0,0,0)/1000})
                    currentDayForecasts = []
                    currentDayForecasts.push(element)
                    nextDay.setDate(elementDate.getDate() + 1);
                    nextDay.setHours(0,0,0,0)
                }
            }); 
            setForecastsByDay(forecastsByDay)
            console.log('forecastsByDay',forecastsByDay)
        }
    }, [forecast]);

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

    if(!filteredForecast) setFilteredForecast(forecast)
    if (!location || !weather || !filteredForecast || !forecastsByDay) return null;

    return (
        <div>
          <hr/>
          <button onClick={()=> setTempScale(tempScale === 'C'? "F":"C")}>Change to °{tempScale === 'C'? "F":"C"}</button>
          <h2>{location.name}</h2>
          <WeatherEntry weather={weather} tempScale={tempScale}/>
          <h2>Forecast</h2>
          <div>
              <h3>Filter by Day:</h3>
              <select name="days" id="days" onChange={(event) => setFilteredForecast(forecastsByDay[parseInt(event.target.value)].forecasts)}>
                  {forecastsByDay.map((forecast,index) =>
                  <option value={index}>{convertUnixTimeToDate(forecast.dt).toLocaleDateString()}</option>
                  )}
              </select>
          </div>
          <div>
            <ol style={{display: 'flex',overflowX: 'scroll', listStyleType: 'none', paddingBottom: '10px', paddingLeft: '10px'}}>
              {filteredForecast.map((timePoint,index) =>
                {
                    console.log('index e %8',(index+1), (index+1) % 8)
                    if(index>0 && (index+1) % 8 === 0) {
                        console.log('array pos',(((index+1) / 8)-1)*8, index)
                        return <TempChart day={filteredForecast.slice((((index+1) / 8)-1)*8, index)}></TempChart>
                    } else {
                        return <li key={timePoint.dt} >
                                    <WeatherEntry weather={timePoint} tempScale={tempScale}/>
                                </li>
                    }
                }
              )}
            </ol>
          </div>
        </div>
      );
};