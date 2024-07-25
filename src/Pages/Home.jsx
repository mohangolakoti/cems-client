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
import { Link } from "react-router-dom";
import EnergyConsumptionChart from "../Components/Charts/EnergyConsumptionChart";
import Loading from "../Components/Loading";
import { API_URL } from "../data/api";

const Home = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [currentEnergy, setCurrentEnergy] = useState(null);
  const [previousDayEnergy, setPreviousDayEnergy] = useState(null);
  const [todayConsumption, setTodayConsumption] = useState(null);
  const [totalEnergy, setTotalEnergy] = useState(0);

  useEffect(() => {
    const fetchPreviousDayEnergy = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/previousDayEnergy`
        );
        setPreviousDayEnergy(response.data.initialEnergyValue);
      } catch (error) {
        console.error("Error fetching previous day energy:", error);
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
      setTotalEnergy((currentEnergy - previousDayEnergy + 300).toFixed(3));
    }
  }, [previousDayEnergy, currentEnergy]);

  if (!data) {
    return <div className="flex justify-center items-center w-full"><Loading/></div>;
  }
  return (
    <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
      <header className="justify-between flex items-center py-2">
        <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 font-Audiowide font-bold dark:text-[#e4e2e2]">
          Vishnu Energy Monitoring System
        </h1>
        <span className="flex flex-row justify-center items-center">
          <img
            className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
            src={theme === "light" ? dark : light}
            alt="add"
            onClick={toggleTheme}
          />
          <p className="md:text-sm 2xl:text-2xl text-xs text-center px-4 text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
            <CurrentTime />
          </p>
        </span>
      </header>
      <div className="grid lg:grid-cols-2 gap-4 grid-cols-1 mt-2 2xl:mt-6">
        <div className="w-full flex flex-col justify-around bg-[#a4a4e3] rounded-lg min-[2000px]:text-4xl xl:text-xl text-lg max-[500px]:text-base font-medium shadow font-OpenSans py-4 px-3 2xl:px-7 max-[500px]:px-0">
          <div className="flex rounded-md px-2 text-center items-center font-Montserrat font-bold justify-between my-2 max-[450px]:px-1">
            <h2 className=" px-5 rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2">
              PCC
            </h2>
            <p className=" ml-3 rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2">
              Power <span className="text-sm">(Kw)</span>
            </p>
            <p className=" rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2">
              Current <span className="text-sm">(A)</span>
            </p>
            <p className=" rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2">
              Energy <span className="text-sm">(Kwh)</span>
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 text-center items-center justify-between max-[360px]:gap-1">
            <Link to='/pcc1'><h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              PCC1
            </h2></Link>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {todayConsumption}
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 text-center items-center justify-between max-[360px]:gap-1">
            <Link to='/pcc2'><h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              PCC2
            </h2></Link>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              100.000
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 text-center items-center justify-between max-[360px]:gap-1">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              PCC3
            </h2>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              100.000
            </p>
          </div>
          <div className="flex gap-5 rounded-md p-2 text-center items-center justify-between max-[360px]:gap-1">
            <h2 className="bg-[#A8E6CF] px-5 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              PCC4
            </h2>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.power.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              {data.current.toFixed(3)}
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2">
              100.000
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
          <RealTimeEnergyMeter totalEnergy={totalEnergy} />
          <div className="flex flex-col gap-4">
            <RealTimePowerMeter power={data.power.toFixed(3)} />
            <PowerFactorCharts powerFactor={data.Power_factor.toFixed(3)} />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row gap-4 flex-col h-[44%] mt-4 ">
        <EnergyConsumptionChart />
        <PowerLineChart />
      </div>
    </section>
  );
};

export default Home;

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
  const [totalEnergy, setTotalEnergy] = useState(0);

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
      setTotalEnergy(((currentEnergy - previousDayEnergy) + 300).toFixed(3));
    }
  }, [previousDayEnergy, currentEnergy]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto">
      <header className="flex justify-between items-center py-2">
        <h1 className="text-2xl p-4 font-Audiowide font-bold dark:text-[#e4e2e2]">
          Vishnu Energy Monitoring System
        </h1>
        <span className="flex items-center">
          <img
            className="w-[30px] h-[30px] cursor-pointer"
            src={theme === "light" ? dark : light}
            alt="theme toggle"
            onClick={toggleTheme}
          />
          <p className="text-sm px-4 text-gray-500 font-Audiowide dark:text-[#eae8e8]">
            <CurrentTime />
          </p>
        </span>
      </header>
      <div className="grid lg:grid-cols-3 gap-4 grid-cols-1">
        <div className="col-span-2 bg-[#a4a4e3] rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-4 gap-4 text-lg font-OpenSans font-medium">
            <div className="flex flex-col items-center">
              <h2 className="font-Montserrat font-bold mb-2">PCC</h2>
              <div className="bg-[#A8E6CF] px-5 py-2 rounded-full">PCC1</div>
              <div className="bg-[#A8E6CF] px-5 py-2 rounded-full">PCC2</div>
              <div className="bg-[#A8E6CF] px-5 py-2 rounded-full">PCC3</div>
              <div className="bg-[#A8E6CF] px-5 py-2 rounded-full">PCC4</div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-Montserrat font-bold mb-2">Power</h2>
              {[...Array(4)].map((_, i) => (
                <div className="bg-white px-4 py-2 mb-2 rounded-full" key={i}>
                  {data.power.toFixed(3)}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-Montserrat font-bold mb-2">Current</h2>
              {[...Array(4)].map((_, i) => (
                <div className="bg-white px-4 py-2 mb-2 rounded-full" key={i}>
                  {data.current.toFixed(3)}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-Montserrat font-bold mb-2">Energy</h2>
              {[...Array(4)].map((_, i) => (
                <div className="bg-white px-4 py-2 mb-2 rounded-full" key={i}>
                  {i === 0 ? todayConsumption : "100.000"}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RealTimeEnergyMeter totalEnergy={totalEnergy} />
          <div className="flex flex-col gap-4">
            <RealTimePowerMeter power={data.power.toFixed(3)} />
            <PowerFactorCharts powerFactor={data.Power_factor.toFixed(3)} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 h-1/2 mt-4">
        <EnergyConsumptionChart />
        <PowerLineChart />
      </div>
    </section>
  );
};

export default Home;
 */
