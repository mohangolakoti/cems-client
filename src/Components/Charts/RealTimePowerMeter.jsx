import GaugeChart from "react-gauge-chart";
import { useTheme } from "../ThemeContext";

const RealTimePowerMeter = ({ power }) => {
  const { theme, toggleTheme } = useTheme();
  const minEnergy = -5;
  const maxEnergy = 12;

  const normalizedPower = (power - minEnergy) / (maxEnergy - minEnergy);
  const gaugeColors =
    theme === "light" ? ["#00ff00", "#ff0000"] : ["#ffff00", "#0000ff"];
  return (
    <div
      className={`bg-white py-1 rounded-lg h-full flex items-center justify-center shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]`}
    >
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === "light" ? "#000" : "#fff"}
        formatTextValue={() => `Power  ${power} kW`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium"
        /* needleColor={theme === 'light' ? '#000' : '#fff'} */
      />
    </div>
  );
};

export default RealTimePowerMeter;
