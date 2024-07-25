import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';

const EnergyLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://energybackend.onrender.com/api/sensordata'); // Adjust the endpoint as needed
        const currentTime = moment().format('HH:mm');   
        const newData = {
          ...response.data,
          timestamp: currentTime
        };
        setData(prevData => [...prevData, newData]);
      } catch (error) {
        console.error('Error fetching energy data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-white rounded-lg w-full h-80 p-2 mx-2 shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-white'>
      {/* <h2>Energy Over Time</h2> */}
      <ResponsiveContainer >
        <LineChart data={data} >
          <XAxis dataKey="timestamp"/>
          <YAxis dataKey='energy' />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#8884d8" name="Energy" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyLineChart;



