import { FC, useEffect, useState } from "react";
import { Weather, WeatherLocation } from "../model/Weather";
import { readForecast, readWeather } from "../services/WeatherService";
import { WeatherEntry } from "./WeatherEntry";
import { TempChart } from "./TempChart";
import "../utils/DateTimeHelper";
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
  const [tempScale, setTempScale] = useState<"C" | "F">("C");
  const [forecastsByDay, setForecastsByDay] = useState<ForecastsByDay[]>([]);
  const [filteredForecast, setFilteredForecast] = useState<Weather[] | null>(null);
  const [filterIndex, setFilterIndex] = useState<number>(0);
  
  useEffect(() => {
    if (forecast) {
      let nextDay: Date = convertUnixTimeToDate(forecast[0].dt);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      let forecastsByDay: ForecastsByDay[] = [];
      let currentDayForecasts: Weather[] = [];
      forecast.forEach((element) => {
        const elementDate = convertUnixTimeToDate(element.dt);
        if (elementDate < nextDay) {
          currentDayForecasts.push(element);
        } else {
          forecastsByDay.push({
            forecasts: currentDayForecasts,
            dt:
              convertUnixTimeToDate(currentDayForecasts[0].dt).setHours(0,0,0,0) / 1000,
          });
          currentDayForecasts = [];
          currentDayForecasts.push(element);
          nextDay.setDate(elementDate.getDate() + 1);
          nextDay.setHours(0, 0, 0, 0);
        }
      });
      setForecastsByDay(forecastsByDay);
      console.log("forecastsByDay", forecastsByDay);
    }
  }, [forecast]);

  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id, tempScale === "C" ? "metric" : "imperial"),
          readForecast(location.id, tempScale === "C" ? "metric" : "imperial"),
        ]);
        setWeather(weather);
        setForecast(forecast);
        setFilterIndex(0);
      }
    })();
  }, [location, tempScale]);

  
  if (!location || !weather || !forecast || !forecastsByDay)
    return null

  //if (!filteredForecast) setFilteredForecast(forecast)

  return (
    <div>
      <hr />
      <button onClick={() => setTempScale(tempScale === "C" ? "F" : "C")}>
        Change to °{tempScale === "C" ? "F" : "C"}
      </button>
      <h2>{location.name}</h2>
      <div
        onClick={(e) => {
          console.log("clicou no mapa", e);
        }}
      >
        <WeatherEntry weather={weather} tempScale={tempScale} />
      </div>

      <h2>Forecast</h2>
      
      <div>
        <h3>Filter by Day:</h3>
        <select
          name="days"
          id="days"
          onChange={(event) =>
            setFilterIndex(parseInt(event.target.value))
          }
        >
          {forecastsByDay.map((forecast, index) => (
            <option value={index}>
              {convertUnixTimeToDate(forecast.dt).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      {
        forecastsByDay[filterIndex]?
        <div>
          <ol
            style={{
              display: "flex",
              overflowX: "scroll",
              listStyleType: "none",
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            
            {forecastsByDay[filterIndex].forecasts.map((timePoint, index) => {
              return <li key={timePoint.dt}>
                <WeatherEntry weather={timePoint} tempScale={tempScale} />
              </li>;
            })}
                
          </ol>
          <TempChart
            forecasts={forecastsByDay[filterIndex].forecasts}
          ></TempChart>
        </div>
        :
        <li>Select Date</li>
      }
    </div>
  );
};
