import { FC } from "react";
import { ForecastsByDay } from "../model/Weather";
import { Select } from "../styles/basicComponents";
import { convertUnixTimeToDate } from "../utils/DateTimeHelper";

interface LocationSearchProps {
  onChange: (index: number) => void;
  forecastsByDay: ForecastsByDay[] | null;
  filterIndex: number;
}

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
            <option value={index}>
              {convertUnixTimeToDate(forecast.dt).toLocaleDateString()}
            </option>
          ))
        : null}
    </Select>
  );
};
