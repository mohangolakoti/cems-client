/* // src/RealTimePowerGraph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

const RealTimeEnergyGraph = () => {
  const [data, setData] = useState([]);

  const fetchPowerData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/realtime-graph');
      const formattedData = response.data.map(entry => ({
        timestamp: format(new Date(entry.timestamp), 'HH:mm'),
        energy: entry.energy
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
      <h2>Real-Time Energy vs. Time (Past 20 Hours)</h2>
      <ResponsiveContainer width="40%" height={300} className="bg-slate-200 ">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeEnergyGraph;
 */

// src/RealTimePowerGraph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Brush
} from 'recharts';
import { format, startOfDay, endOfDay, addMinutes } from 'date-fns';
import { API_URL } from '../../data/api';

const RealTimePowerGraph = () => {
  const [data, setData] = useState([]);

  const fetchPowerData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/realtime-graph`);
      const formattedData = response.data.map(entry => ({
        timestamp: new Date(entry.timestamp).getTime(), // Convert to milliseconds for recharts
        energy: entry.energy
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching power data:', error);
    }
  };

  useEffect(() => {
    fetchPowerData(); // Initial fetch
    const intervalId = setInterval(fetchPowerData, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Function to generate timestamps for every 30 minutes
  const generateTimeTicks = () => {
    const today = new Date();
    const ticks = [];
    let currentTime = startOfDay(today);
    const endTime = endOfDay(today);
    while (currentTime <= endTime) {
      ticks.push(currentTime.getTime()); // Convert to milliseconds for recharts
      currentTime = addMinutes(currentTime, 30);
    }
    return ticks;
  };

  return (
    <div>
      <h2>Real-Time Energy vs. Time (12 AM - 11:59 PM)</h2>
      <ResponsiveContainer width="40%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={[startOfDay(new Date()).getTime(), endOfDay(new Date()).getTime()]}
            tickFormatter={(unixTime) => format(new Date(unixTime), 'HH:mm')}
            ticks={generateTimeTicks()}
          />
          <YAxis />
          <Tooltip labelFormatter={(label) => format(new Date(label), 'HH:mm')} />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimePowerGraph;
