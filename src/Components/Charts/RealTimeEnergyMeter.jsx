/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts';

const RealTimeEnergyMeter = () => {
  const [energyMeter, setEnergyMeter] = useState(0);
  const maxEnergy = 1000; // Define the maximum energy value for the meter

  const fetchCurrentEnergy = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/sensordata');
      setEnergyMeter(response.data.energy_consumption);
    } catch (error) {
      console.error('Error fetching current energy:', error);
    }
  };

  useEffect(() => {
    fetchCurrentEnergy(); // Initial fetch
    const intervalId = setInterval(fetchCurrentEnergy, 10000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const data = [
    { name: 'Energy', value: energyMeter },
    { name: 'Remaining', value: maxEnergy - energyMeter }
  ];

  const COLORS = ['#8884d8', '#000000'];

  return (
    <div className='bg-white py-1 w-fit h-1/2 rounded-lg  m-2 text-lg shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]'>
      <ResponsiveContainer height={300} width={300}> 
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={150}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label value={`Energy-${energyMeter.toFixed(2)} kWh`} position="center" className='text-wrap' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeEnergyMeter;

 */
/* import GaugeChart from 'react-gauge-chart';

const RealTimeEnergyMeter = ({totalEnergy}) => {
  const maxEnergy = 5000
  return (
    <div className='bg-white px-5 py-1 w-full rounded-lg h-fit  mx-2 my-4 text-lg shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]'>
      
      <GaugeChart 
        id="gauge-chart"
        nrOfLevels={3}
        percent={totalEnergy / maxEnergy}
        textColor="#000000"
        formatTextValue={() => `Energy  ${totalEnergy} kW`}
      />
      
    </div>
  )
}

export default RealTimeEnergyMeter */
import { PieChart, Pie, Cell,Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '../ThemeContext';
import { useEffect, useState } from 'react';

const RealTimeEnergyMeter = ({ totalEnergy }) => {
  const { theme, toggleTheme } = useTheme();
  const maxEnergy = 2500;
  const data = [{ value: maxEnergy, fill: '#8884d8' }, { value: (maxEnergy-totalEnergy), fill: '#000' }];

  const [radius, setRadius] = useState({ innerRadius: 70, outerRadius: 110 });

  const updateRadius = () => {
    const width = window.innerWidth;
    if (width < 500) {
      setRadius({ innerRadius: 60, outerRadius: 90 });
    }
     else if (width < 1056 && width>1023) {
      setRadius({ innerRadius: 62, outerRadius: 92 });
    }
    else if(width>1440 && width<2000){
      setRadius({innerRadius:90, outerRadius:140})
    }
    else if(width>2000 ){
      setRadius({innerRadius:110, outerRadius:170})
    }
     else {
      setRadius({ innerRadius: 80, outerRadius: 120 });
    }
  };

  useEffect(() => {
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);


  return (
    <div className={`bg-white items-center flex rounded-lg shadow font-OpenSans dark:bg-[#2c2c2c] `}>
      <ResponsiveContainer > 
        <PieChart>
          <Pie
            data={data}
            innerRadius={radius.innerRadius}
            outerRadius={radius.outerRadius}
            paddingAngle={2}
            startAngle={360}
            endAngle={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill}/>
            ))}
            <Label
              value={`Energy-${totalEnergy}`}
              position="center"
              style={{ fill: theme == 'light'?'#000':'#fff'}}
              className='min-[2000px]:text-3xl 2xl:text-2xl text-lg max-[500px]:text-base font-medium'
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeEnergyMeter;