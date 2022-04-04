import { FC } from "react";
import { ForecastsByDay } from "../model/Weather";
import { Select } from "../styles/basicComponents";
import { convertUnixTimeToDate } from "../utils/DateTimeHelper";

interface LocationSearchProps {
  onChange: (index: number) => void;
  forecastsByDay: ForecastsByDay[] | null;
  filterIndex: number;
}

/**
 * A component that displays a list of available days in the forecasts and allows the user to select one.
 * @param {
 *   onChange,
 *   forecastsByDay,
 *   filterIndex,
 * }
 * @returns
 */
export const DaySelector: FC<LocationSearchProps> = ({
  onChange,
  forecastsByDay,
  filterIndex,
}) => {
  return (
    <Select
      name="days"
      id="days"
      value={filterIndex}
      onChange={(event) => onChange(parseInt(event.target.value))}
    >
      {forecastsByDay
        ? forecastsByDay.map((forecast, index) => (
            <option key={index} value={index}>
              {convertUnixTimeToDate(forecast.dt).toLocaleDateString()}
            </option>
          ))
        : null}
    </Select>
  );
};
