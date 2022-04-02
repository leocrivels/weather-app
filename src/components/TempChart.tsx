import { FC, useEffect, useState } from "react";
import { Weather } from "../model/Weather";
import {convertUnixTimeToDate} from "../utils/DateTimeHelper"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface TempChartProps {
  forecasts: Weather[];
}
interface Dataset {
  label: string,
  // y-axis data plotting values
  data: number[],
  fill: Boolean,
  borderWidth: number,
  backgroundColor: string,
  borderColor: string,
  responsive: Boolean
}
interface ChartData {
  labels: string[],
  datasets: {
    label: string,
    // y-axis data plotting values
    data: number[],
    fill: Boolean,
    borderWidth: number,
    backgroundColor: string,
    borderColor: string,
    responsive: Boolean
  }[],
}

export const TempChart: FC<TempChartProps> = ({ forecasts }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  });
  useEffect(()=>{
    //var chartData:ChartData = {} as ChartData
    //var dataset:Dataset = {} as Dataset
    var chartData:number[] = []
    var dataset:string[] = []
    var teste = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    }
    forecasts.forEach((forecast) => {
      chartData.push(forecast.main.temp)
      dataset.push(convertUnixTimeToDate(forecast.dt).toLocaleTimeString())
    })
    //chartData.datasets.push(dataset)
    teste.labels = dataset
    teste.datasets[0].data = chartData
    setData(teste)
    console.log(chartData,dataset)
    //setChartData(forecasts)
  },[forecasts])

  if(!data) return null

  return (
    <div>
      <Line data={data} />
    </div>
  );
}