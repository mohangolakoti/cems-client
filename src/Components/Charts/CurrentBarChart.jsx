import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const CustomLabel = ({ x, y, width, value, name }) => {
  return (
    <text x={x + width / 2} y={y} dy={-4} textAnchor="middle" className='font-semibold text-[0.5rem] dark:text-[#ffffff]'>
      {`${name}: ${value.toFixed(2)}`}
    </text>
  );
};

const CurrentBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://energybackend.onrender.com/api/sensordata'); // Replace with your backend endpoint
        setData([response.data]);
      } catch (error) {
        console.error('Error fetching current data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-2 h-[22rem] m-2 shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]">
      {/* <h2>Current Values Comparison at Realtime</h2> */}
      <ResponsiveContainer>
        <BarChart data={data}>
          
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Bar dataKey="IRcurrent" fill="#8884d8" name="IRcurrent">
            <LabelList dataKey="IRcurrent" className='dark:text-[#ffffff]' content={<CustomLabel name="IRcurrent" className='dark:text-[#ffffff]' />} />
          </Bar>
          <Bar dataKey="IYcurrent" fill="#82ca9d" name="IYcurrent">
            <LabelList dataKey="IYcurrent" content={<CustomLabel name="IYcurrent" />} />
          </Bar>
          <Bar dataKey="IBcurrent" fill="#ffc658" name="IBcurrent">
            <LabelList dataKey="IBcurrent" content={<CustomLabel name="IBcurrent" />} />
          </Bar>
          <Bar dataKey="IRLcurrent" fill="#ff7300" name="IRLcurrent">
            <LabelList dataKey="IRLcurrent" content={<CustomLabel name="IRLcurrent" />} />
          </Bar>
          <Bar dataKey="IYLcurrent" fill="#00C49F" name="IYLcurrent">
            <LabelList dataKey="IYLcurrent" content={<CustomLabel name="IYLcurrent" />} />
          </Bar>
          <Bar dataKey="IBLcurrent" fill="#FFBB99" name="IBLcurrent">
            <LabelList dataKey="IBLcurrent" content={<CustomLabel name="IBLcurrent" />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentBarChart;
