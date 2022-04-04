import { WeatherLocation, Weather, LocationName, ForecastsByDay } from '../model/Weather';
import { convertUnixTimeToDate } from '../utils/DateTimeHelper';

export const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;

if (key === undefined) {
  throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const keyQuery = `appid=${key}`
const server = 'http://api.openweathermap.org/data/2.5';
const serverGeoEndpoint = 'http://api.openweathermap.org/geo/1.0'

/**
 * Searchs location by name
 * @param term 
 * @returns location 
 */
export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

/**
 * Gets location by coord
 * @param lat 
 * @param lon 
 * @returns location by coord 
 */
export async function getLocationByCoord(lat: number, lon: number): Promise<LocationName[] | undefined> {
  const result = await fetch(`${serverGeoEndpoint}/reverse?lat=${lat}&lon=${lon}&limit=1&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

/**
 * Reads current weather
 * @param locationId 
 * @param units 
 * @returns weather 
 */
export async function readWeather(locationId: number, units: string): Promise<Weather> {
  const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=${units}`);

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

/**
 * Gets Open Weather icon url
 * @param code 
 * @returns icon url 
 */
export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

/**
 * Reads forecast for next 5 days
 * @param locationId 
 * @param units 
 * @returns forecast 
 */
export async function readForecast(locationId: number, units: string): Promise<Weather[]> {
  const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=${units}`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}

/**
 * Reads forecast for next 5 days by coord
 * @param lat 
 * @param lon 
 * @param units 
 * @returns forecast by coord 
 */
export async function readForecastByCoord(lat: number, lon: number, units: string): Promise<Weather[]> {
  const forecast = await fetch(`${server}/forecast?lat=${lat}&lat=${lon}&${keyQuery}&units=${units}`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}

/**
 * Reads forecast for next 5 days and separate by day
 * @param locationId 
 * @param units 
 * @returns daily forecast 
 */
export async function readDailyForecast(locationId: number, units: string): Promise<ForecastsByDay[]> {
    const result = await readForecast(locationId, units);

    let nextDay: Date = convertUnixTimeToDate(result[0].dt);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      let forecastsByDay: ForecastsByDay[] = [];
      let currentDayForecasts: Weather[] = [];
      result.forEach((element) => {
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

    return (await forecastsByDay);
  }