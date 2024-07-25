import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import { useTheme } from '../ThemeContext';

const PowerFactorCharts = ({powerFactor}) => {
  const { theme, toggleTheme } = useTheme();
  const minEnergy = -5;
  const maxEnergy = 5;

  const normalizedPower = (powerFactor - minEnergy) / (maxEnergy - minEnergy);

  const gaugeColors = theme === 'light' ? ['#f0ff00' , '#0000ff'] : ['#00ff00', '#ff0000'];

  return (
    <div className='bg-white py-1 rounded-lg h-full flex items-center min-[2000px]:text-2xl 2xl:text-xl text-lg max-[500px]:text-base font-medium justify-center shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]'>
      <GaugeChart 
        id="gauge-chart"
        nrOfLevels={3}
        percent={normalizedPower}
        colors={gaugeColors}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        className=''
        /* needleColor={theme === 'light' ? '#000' : '#fff'} */
      />
    </div>
  );
};

export default PowerFactorCharts;


/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PowerFactorCharts = () => {
  const [currentPowerFactor, setCurrentPowerFactor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://energybackend.onrender.com/api/sensordata'); // Replace with your backend endpoint
        const sensorData = response.data;
        setCurrentPowerFactor(sensorData.Power_factor);
      } catch (error) {
        console.error('Error fetching power factor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-white rounded-lg w-full p-2 h-[22rem] m-2 shadow'>
      <h2 className='font-semibold font-Montserrat'>Power Factor Gauge</h2>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar 
          value={currentPowerFactor * 100} 
          text={`${(currentPowerFactor * 100).toFixed(1)}%`} 
          styles={buildStyles({
            textColor: "#000000",
            pathColor: currentPowerFactor > 0.8 ? "#00FF00" : currentPowerFactor > 0.6 ? "#FFFF00" : "#FF0000",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default PowerFactorCharts;
 */