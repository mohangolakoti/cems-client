import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';

const VoltageLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://energybackend.onrender.com/api/sensordata'); // Adjust the endpoint as needed
        const currentTime = moment().format('HH:mm:ss');
        const newData = {
          ...response.data,
          timestamp: currentTime
        };
        setData(prevData => [...prevData, newData]);
      } catch (error) {
        console.error('Error fetching voltage data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='mt-20 w-1/3 h-80'>
      <h2>Voltage Levels Over Time</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="VRvoltage" stroke="#8884d8" name="VR Voltage" />
          <Line type="monotone" dataKey="VYvoltage" stroke="#82ca9d" name="VY Voltage" />
          <Line type="monotone" dataKey="VBvoltage" stroke="#ffc658" name="VB Voltage" />
          <Line type="monotone" dataKey="VRLvoltage" stroke="#ff7300" name="VRL Voltage" />
          <Line type="monotone" dataKey="VYLvoltage" stroke="#00C49F" name="VYL Voltage" />
          <Line type="monotone" dataKey="VBLvoltage" stroke="#FFBB28" name="VBL Voltage" />
          <Line type="monotone" dataKey="Voltage" stroke="#000000" name="Voltage" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoltageLineChart;
