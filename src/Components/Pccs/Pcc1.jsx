import React from 'react'
import { useTheme } from '../ThemeContext';
import { dark, light, pcc1 } from '../../Constants';
import CurrentTime from '../CurrentTime';
import Sidebar from '../Sidebar';

const Pcc1 = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <section className="flex md:flex-row flex-col bg-[#F1F4FC] dark:bg-[#1e1e1e]">
    <Sidebar />
    <section className="w-full h-screen overflow-auto">
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

      <section className='flex justify-center items-center'>
        <div className='w-fit my-10 bg-gray-400 xl:px-10 py-5 rounded-lg dark:bg-[#2c2c2c] md:px-7 px-2'>
          <h1 className='text-center py-2 text-2xl underline font-bold text-[#2c2c2c] dark:text-white'>PCC1</h1>
        <div className="flex rounded-md md:pl-4 pl-0 text-center items-center font-Montserrat font-bold  my-2 max-[450px]:px-1 dark:text-white md:gap-4 gap-2 max-[620px]:gap-1 ">
            <h2 className="rounded-full text-gray-400 w-64 dark:text-[#2c2c2c]">
              PCC
            </h2>
            <p className=" ml-3 rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2">
              Power <span className="text-sm">(Kw)</span>
            </p>
            <p className=" rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2 ">
              Current <span className="text-sm">(A)</span>
            </p>
            <p className=" rounded-full max-[450px]:px-2 min-[2000px]:px-6 2xl:py-2 ">
              Energy <span className="text-sm">(Kwh)</span>
            </p>
          </div>
        {pcc1.map((item)=>
        <div className=''>
          <div className="flex md:gap-10 gap-8 max-[620px]:gap-6 rounded-md p-2 text-center items-center  max-[360px]:gap-1 ">
            <h2 className="bg-[#A8E6CF] md:w-64 w-56 font-medium py-2 rounded-full 2xl:py-4 ">
              {item.title}
            </h2>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2 ">
              100.00
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2 ">
              100.00
            </p>
            <p className="bg-white px-4 py-1 rounded-full min-[2000px]:px-6 2xl:py-2 max-[450px]:px-2 ">
              100.00
            </p>
          </div>
        </div>
      )}
        </div>
      </section>

      </section>
      </section>
      
  )
}

export default Pcc1