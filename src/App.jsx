import Dashboard from "./Pages/Dashboard";
import {Routes,Route} from 'react-router-dom'
import DatewiseGraphs from "./Pages/DatewiseGraphs";
import Pcc1 from "./Components/Pccs/Pcc1";
import Pcc2 from "./Components/Pccs/Pcc2";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/graphs" element={<DatewiseGraphs/>}/>
        <Route path="/pcc1" element={<Pcc1/>} />
        <Route path="/pcc2" element={<Pcc2/>} />
        <Route path="/pcc1" element={<Pcc1/>} />
      </Routes>
    </div>
  );
};

export default App;
