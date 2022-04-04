import { FC, useEffect, useState } from "react";
import { Weather, WeatherLocation } from "../model/Weather";
import { readWeather, readDailyForecast } from "../services/WeatherService";
import { WeatherEntry } from "./WeatherEntry";
import { DaySelector } from "./DaySelector";
import { TempChart } from "./TempChart";
import { LeafletMap } from "./LeafletMap";
import "../utils/DateTimeHelper";
import { LatLngTuple } from "leaflet";
import { Title, FlexCentered } from "../styles/basicComponents";
import {
  MainWeather,
  SummaryOffset,
  ForecastList,
} from "../styles/weatherComponents";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
  tempScale: "C" | "F";
}

interface ForecastsByDay {
  forecasts: Weather[];
  dt: number;
}

/**
 * Display all weather and forecasts data for a given location.
 * @param {
 *   location,
 *   tempScale,
 * }
 * @returns
 */
export const WeatherSummary: FC<WeatherSummaryProps> = ({
  location,
  tempScale,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecastsByDay, setForecastsByDay] = useState<ForecastsByDay[]>([]);
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const onFilterChange = (index: number) => {
    setFilterIndex(index);
  };

  /**
   * Retrieve the forecasts data from the open weather api.
   */
  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecastByDay] = await Promise.all([
          readWeather(location.id, tempScale === "C" ? "metric" : "imperial"),
          readDailyForecast(
            location.id,
            tempScale === "C" ? "metric" : "imperial"
          ),
        ]);
        setWeather(weather);
        setForecastsByDay(forecastByDay);
        setFilterIndex(0);
      }
    })();
  }, [location, tempScale]);

  if (!location || !weather || !forecastsByDay) return null;

  const mapCenter: LatLngTuple = [location.coord.lat, location.coord.lon];

  return (
    <SummaryOffset>
      <FlexCentered>
        <Title>{location.name}</Title>
      </FlexCentered>
      <h1>Current Weather:</h1>
      <MainWeather
        onClick={(e) => {
          console.log("clicou no mapa", e);
        }}
      >
        <WeatherEntry weather={weather} tempScale={tempScale} current />
        <LeafletMap defaultLatLng={mapCenter}></LeafletMap>
      </MainWeather>

      <div>
        {<h1>Forecasts:</h1>}
        <DaySelector
          filterIndex={filterIndex}
          onChange={onFilterChange}
          forecastsByDay={forecastsByDay}
        ></DaySelector>
      </div>
      {forecastsByDay[filterIndex] ? (
        <div style={{ width: "100%" }}>
          <ForecastList>
            {forecastsByDay[filterIndex].forecasts.map((timePoint, index) => {
              return (
                <li key={timePoint.dt}>
                  <WeatherEntry weather={timePoint} tempScale={tempScale} />
                </li>
              );
            })}
          </ForecastList>
          <TempChart
            forecasts={forecastsByDay[filterIndex].forecasts}
          ></TempChart>
        </div>
      ) : (
        <li>Select Date</li>
      )}
    </SummaryOffset>
  );
};
