import { FC, useEffect, useState } from "react";
import { Weather } from "../model/Weather";
import { convertUnixTimeToDate } from "../utils/DateTimeHelper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TempChartProps {
  forecasts: Weather[];
}

/**
 * Renders a chart of the temperature in the forecasts over time.
 * @param { forecasts }
 * @returns
 */
export const TempChart: FC<TempChartProps> = ({ forecasts }) => {
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Temperature",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    var chartData: number[] = [];
    var dataset: string[] = [];
    var data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Temperature",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    forecasts.forEach((forecast) => {
      chartData.push(forecast.main.temp);
      dataset.push(convertUnixTimeToDate(forecast.dt).toLocaleTimeString());
    });
    data.labels = dataset;
    data.datasets[0].data = chartData;
    setData(data);
  }, [forecasts]);

  if (!data) return null;

  return (
    <div>
      <Line data={data} />
    </div>
  );
};
