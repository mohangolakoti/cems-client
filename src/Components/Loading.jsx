import React from "react";

const Loading = () => {
  return (
    <div className="text-center flex items-center justify-center flex-col">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin text-center border-[#a4a4e3] mx-auto"></div>
      <h2 className="text-zinc-900 dark:text-gray-900 mt-4">Loading...</h2>
    </div>
  );
};

export default Loading;
