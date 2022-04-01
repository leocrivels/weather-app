import { FC, useEffect, useState } from "react";
import { Weather } from "../model/Weather";
import {convertUnixTimeToDate} from "../utils/DateTimeHelper"

interface TempChartProps {
  day: Weather[];
}

export const TempChart: FC<TempChartProps> = ({ day }) => {
  const [chartData, setChartData] = useState<Weather[]>(day)
  useEffect(()=>{
    setChartData(day)
  },[day])
  console.log(convertUnixTimeToDate(chartData[0].dt).toLocaleDateString(),chartData)
  return null
}