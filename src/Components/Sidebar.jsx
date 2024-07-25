import React from "react";
import { useTheme } from "./ThemeContext";
import { home, chart, power, user, dark, light, pcc } from "../Constants";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "rsuite";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const renderToggle = (props) => <Avatar circle {...props} src={pcc} />;

  return (
    <div className="bg-[#2c2c2c] flex md:flex-col flex-row justify-between md:w-fit dark:bg-[#2c2c2c]">
      <ul className="flex md:flex-col gap-4 flex-row text-nowrap mx-5 md:my-2 justify-between">
        <li className="w-full text-lg font-medium rounded-lg md:my-2 my-6 md:mx-[8px] ">
          <img src={power} alt="add" />
        </li>
        <li className="w-full text-lg font-medium cursor-pointer md:my-8 md:mx-2 ml-5 my-6">
          <Link to="/">
            <img src={home} alt="add" className="w-[30px]" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-2 md:ml-2 ml-4  my-6">
          <Link to="/graphs">
            <img src={chart} alt="add" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg cursor-pointer md:my-9 md:mx-2 ml-5 my-6">
        <Dropdown renderToggle={renderToggle} className="absolute">
          <div className="bg-[#2c2c2c] p-2 mt-2 border rounded-lg text-white">
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black"><Link to='/pcc1'>PCC1</Link></Dropdown.Item>
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black"><Link to='/pcc2'>PCC2</Link></Dropdown.Item>
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black">PCC3</Dropdown.Item>
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black">PCC4</Dropdown.Item>
            </div>
          </Dropdown>
        </li>
      </ul>
      {/* <ul className="flex md:flex-col flex-row text-nowrap p-5 cursor-pointer">
          <li className="w-full py-2 text-white text-lg font-medium rounded-lg md:hover:ring-1 md:hover:ring-[#babaf1] md:pl-1.5">
            <img src={theme === 'light' ? dark : light} alt="add" onClick={toggleTheme}/>
          </li>
          <li className="w-full py-3 md:py-2 text-white text-lg font-medium rounded-lg md:hover:ring-1 md:hover:ring-[#babaf1] px-2 md:my-7">
            <img src={user} alt="add" />
          </li>
        </ul> */}
    </div>
  );
};

export default Sidebar;
