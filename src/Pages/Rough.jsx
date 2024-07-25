import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RealTimePowerGraph from '../Components/Graphs/RealTimePowerGraph';
import RealTimeEnergyGraph from '../Components/Graphs/RealTimeEnergyGraph';
import RealTimeVoltageGraph from '../Components/Graphs/RealTimeVoltageGraph';
import DailyPowerGraph from '../Components/Graphs/DailyPowerGraph';
import { format } from 'date-fns';
import DailyEnergyGraph from '../Components/Graphs/DailyEnergyGraph';
import DailyVoltageGraph from '../Components/Graphs/DailyVoltageGraph';
import RealTimeEnergyMeter from '../Components/Charts/RealTimeEnergyMeter';
import CurrentBarChart from '../Components/Charts/CurrentBarChart';
import PowerFactorCharts from '../Components/Charts/PowerFactorCharts';
import VoltageLineChart from '../Components/Charts/VoltageLineChart';
import EnergyLineChart from '../Components/Charts/EnergyLineChart';
import Sidebar from '../Components/Sidebar';
import PowerLineChart from '../Components/Charts/PowerLineChart';
import EnergyConsumptionChart from '../Components/Charts/EnergyConsumptionChart'
import { API_URL } from '../data/api';

import { useTheme } from '../Components/ThemeContext';

const Rough = () => {

    const [data, setData] = useState(null);
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd')); // Example date
    const { theme, toggleTheme } = useTheme();

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/sensordata`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

        if (!data) {
            return <div>Loading...</div>;
        }

  return (
    <div className='w-full'>
      <h1>Sensor Data</h1>
      <p>Date: {data.timestamp}</p>
      <p>Current: {data.current}</p>
      <p>Power: {data.power}</p>
      <p>Energy: {data.energy}</p>
      <p>IR Current: {data.IRcurrent}</p>
      <p>IY Current: {data.IYcurrent}</p>
      <p>IB Current: {data.IBcurrent}</p>
      <p>VR Voltage: {data.VRvoltage}</p>
      <p>VY Voltage: {data.VYvoltage}</p>
      <p>VB Voltage: {data.VBvoltage}</p>
      <p>IRL Current: {data.IRLcurrent}</p>
      <p>IYL Current: {data.IYLcurrent}</p>
      <p>IBL Current: {data.IBLcurrent}</p>
      <p>VRL Voltage: {data.VRLvoltage}</p>
      <p>VYL Voltage: {data.VYLvoltage}</p>
      <p>VBL Voltage: {data.VBLvoltage}</p>
      <p>R Power: {data.R_power}</p>
      <p>Y Power: {data.Y_power}</p>
      <p>B Power: {data.B_power}</p>
      <p>Active Power: {data.Active_power}</p>
      <p>Reactive Power: {data.Reactive_power}</p>
      <p>Power Factor: {data.Power_factor}</p>
      <p>Energy Meter: {data.Energy_Meter}</p>
      <p>Voltage: {data.Voltage}</p>
      <p>Energy Consumption: {data.energy_consumption}</p>
      <RealTimePowerGraph/>
     <RealTimeEnergyGraph/>
     <RealTimeVoltageGraph/>
     <header className="App-header">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
     <DailyPowerGraph  date={date}/>
     <DailyEnergyGraph date={date} />
     <DailyVoltageGraph date={date} />
     </header>  
     <RealTimeEnergyMeter/>
     <CurrentBarChart/>
     <PowerFactorCharts/>
     <VoltageLineChart/>
     <EnergyLineChart/>
     <PowerLineChart/>
     <EnergyConsumptionChart/>

     <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <h1 className="text-2xl font-bold mb-4">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>

     </div>
  )
}

export default Rough


/* 
import React, { useState, useEffect } from "react";
import axios from "axios";
import RealTimeEnergyMeter from "../Components/Charts/RealTimeEnergyMeter";
import PowerLineChart from "../Components/Charts/PowerLineChart";
import EnergyLineChart from "../Components/Charts/EnergyLineChart";
import CurrentBarChart from "../Components/Charts/CurrentBarChart";
import PowerFactorCharts from "../Components/Charts/PowerFactorCharts";
import moment from "moment";
import CurrentTime from "../Components/CurrentTime";
import { useTheme } from "../Components/ThemeContext";
import { dark, light } from "../Constants";
import RealTimePowerMeter from "../Components/Charts/RealTimePowerMeter";
import EnergyConsumptionChart from "../Components/Charts/EnergyConsumptionChart";

const Home = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [currentEnergy, setCurrentEnergy] = useState(null);
  const [previousDayEnergy, setPreviousDayEnergy] = useState(null);
  const [todayConsumption, setTodayConsumption] = useState(null);
  const [totalEnergy,setTotalEnergy] = useState(0)


  useEffect(() => {
    const fetchPreviousDayEnergy = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/previousDayEnergy');
        setPreviousDayEnergy(response.data.initialEnergyValue);
      } catch (error) {
        console.error('Error fetching previous day energy:', error);
      }
    };

    fetchPreviousDayEnergy();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://energybackend.onrender.com/api/sensordata"
        );
        setData(response.data);
        setCurrentEnergy(response.data.energy);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (previousDayEnergy !== null && currentEnergy !== null) {
      setTodayConsumption((currentEnergy - previousDayEnergy).toFixed(3));
      setTotalEnergy(((currentEnergy - previousDayEnergy)+300).toFixed(3))
    }
  }, [previousDayEnergy, currentEnergy]);


  if (!data) {
            return <div>Loading...</div>;
        }
  return (
    <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] min-h-screen">
      <header className="justify-between flex">
        <h1 className="text-2xl p-4 font-Audiowide font-bold dark:text-[#e4e2e2]">
          Vishnu Energy Monitoring System
        </h1>
        <span className="flex flex-row ">
          <img
            className="w-[30px] h-[30px] mt-5 cursor-pointer"
            src={theme === "light" ? dark : light }
            alt="add"
            onClick={toggleTheme}
          />
          <p className="text-sm pt-7 px-4 text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
            <CurrentTime />
          </p>
        </span>
      </header>
      <div className="flex mt-3 xl:flex-row flex-col h-1/2">
        <div className="w-full flex flex-col justify-around bg-[#a4a4e3] rounded-lg mx-2 my-2 text-lg shadow font-OpenSans font-medium">
          <div className="flex rounded-md px-2 mx-3 text-center items-center font-Montserrat font-bold justify-between my-4 ">
            <h2 className=" px-5 rounded-full">PCC</h2>
            <p className=" px-4 rounded-full">Power</p>
            <p className=" px-4 rounded-full">Current</p>
            <p className=" px-4 rounded-full">Energy</p>
          </div>
          <div className="flex gap-5 rounded-md p-2 mx-3 text-center items-center justify-between ">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full">PCC1</h2>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              {todayConsumption}
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 mx-3 text-center items-center justify-between ">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full">PCC2</h2>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              100.000
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 mx-3 text-center items-center justify-between ">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full">PCC3</h2>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              100.000
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 mx-3 text-center items-center justify-between ">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full">PCC4</h2>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full">
              100.000
            </p>
          </div>
        </div>
        <div className="flex w-full h-full md:flex-row">
        <RealTimeEnergyMeter totalEnergy={totalEnergy}/>
        <div className="flex flex-col w-1/2">
        <RealTimePowerMeter power={data.power.toFixed(3)}/>
        <PowerFactorCharts powerFactor={data.Power_factor.toFixed(3)}/>
        </div>
     
        </div>
      </div>
      <div className="flex w-full md:flex-row flex-col h-1/3">
        <EnergyConsumptionChart/>
         <PowerLineChart />
        
      </div>
    </section>
  );
};

export default Home;
 */