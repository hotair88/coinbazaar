import { getHistoricalChart } from "../api-config/apiService";
import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartComp({cryptoData, currCurrency}) {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(30);

  async function getHistoricalData() {
    try {
      const data = await getHistoricalChart(cryptoData.id, days, currCurrency.toLowerCase());
      setHistoricalData(data.prices);
      console.log(currCurrency.toLowerCase());
    } catch (error) {
      console.error('Error while fetching chart data : ', error.message);
    }
  }

  useEffect(() => {
    getHistoricalData();

  }, [days, currCurrency]);

  const graphData = historicalData
    ? historicalData.map((item) => {
        const [timestamp, price] = item;
        const formattedDate = new Date(timestamp).toLocaleDateString('hi-IN', { dateStyle: 'short' });
        const formattedPrice = price;
        return {
          Date: formattedDate,
          Price: formattedPrice,
        };
      })
    : [];

  return (
    <div className="wrapper">
    <div className="chart">
      {graphData.length > 0 && (
        <div className="text-xs">
          <AreaChart
            width={950}
            height={300}
            data={graphData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }
          }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Price"
              // stroke="#CA8A04"
              // fill="#00B386"
              stroke="#8884d8" fill="#8884d8"
            />
          </AreaChart>
        </div>
      )}
    </div>
    <div className="buttons mt-6 flex justify-between gap-4">
      <button
        onClick={() => setDays(7)}
        className="rounded-md bg-indigo-100 px-8 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
      >
        7 Days
      </button>
      <button
        onClick={() => setDays(30)}
        className="rounded-md bg-indigo-200 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
      >
        30 Days
      </button>
      <button
        onClick={() => setDays(91)}
        className="py-m rounded-md bg-indigo-300 px-6 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-400 active:scale-95"
      >
        3 Months
      </button>
      <button
        onClick={() => setDays(183)}
        className="rounded-md bg-indigo-400 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
      >
        6 Months
      </button>
      <button
        onClick={() => setDays(365)}
        className="rounded-md bg-indigo-500 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
      >
        1 Year
      </button>
      <button
        onClick={() => setDays(365 * 5)}
        className="py-m rounded-md bg-indigo-600 px-6 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
      >
        5 Years
      </button>
    </div>
  </div>
  );
}