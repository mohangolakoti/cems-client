// src/RealTimePowerGraph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { API_URL } from '../../data/api';

const RealTimeVoltageGraph = () => {
  const [data, setData] = useState([]);

  const fetchPowerData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/realtime-graph`);
      const formattedData = response.data.map(entry => ({
        timestamp: format(new Date(entry.timestamp), 'HH:mm'),
        voltage: entry.Voltage
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching power data:', error);
    }
  };

  useEffect(() => {
    fetchPowerData(); // Initial fetch
    const intervalId = setInterval(fetchPowerData, 10000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Real-Time Power vs. Time (Past 20 Hours)</h2>
      <ResponsiveContainer width="40%" height={300} >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="voltage" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeVoltageGraph;
