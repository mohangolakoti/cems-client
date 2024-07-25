import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, startOfDay, endOfDay, addMinutes } from 'date-fns';
import { useTheme } from '../ThemeContext';
import { API_URL } from '../../data/api';

const DailyVoltageGraph = ({ date }) => {
  const [data, setData] = useState([]);
  const { theme, toggleTheme } = useTheme();

  const fetchPowerData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/daywise-graph/${date}`);
      const formattedData = response.data.map(entry => ({
        timestamp: new Date(entry.timestamp).getTime(), // Convert to milliseconds for recharts
        Voltage: entry.Voltage
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching power data:', error);
    }
  };

  useEffect(() => {
    fetchPowerData(date); // Initial fetch
    const intervalId = setInterval(() => fetchPowerData(date), 30000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [date]);

  // Function to generate timestamps for every 30 minutes
  const generateTimeTicks = () => {
    const ticks = [];
    let currentTime = startOfDay(new Date(date));
    const endTime = endOfDay(new Date(date));
    while (currentTime <= endTime) {
      ticks.push(currentTime.getTime()); // Convert to milliseconds for recharts
      currentTime = addMinutes(currentTime, 30);
    }
    return ticks;
  };

  return (
    <div className='bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg  shadow font-OpenSans dark:bg-[#2c2c2c] '>
      <h2 className='p-2 m-2 font-semibold text-lg font-Montserrat dark:text-[#e4e2e2]'>Real-Time Voltage vs. Time (12 AM - 11:59 PM)</h2>
      <ResponsiveContainer width="100%" height={400} className="font-semibold text-lg font-OpenSans">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={[startOfDay(new Date(date)).getTime(), endOfDay(new Date(date)).getTime()]}
            tickFormatter={(unixTime) => format(new Date(unixTime), 'HH:mm')}
            ticks={generateTimeTicks()}
            className=" 2xl:text-xl text-sm max-[500px]:text-xs font-medium"
            tick={{ fill: theme == 'light'?'#000':'#fff' }}
          />
          <YAxis tick={{ fill: theme == 'light'?'#000':'#fff' }} className=" 2xl:text-xl text-sm max-[500px]:text-xs font-medium"/>
          <Tooltip labelFormatter={(label) => format(new Date(label), 'HH:mm')} />
          <Legend />
          <Line type="monotone" dataKey="Voltage" stroke="#8884d8" name='Voltage'/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyVoltageGraph;
