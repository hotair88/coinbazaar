import React from 'react';

const GreenUpArrow = () => {
  return (
    <div className="flex items-center justify-start ">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#00ff00"  // Set the fill color to green
    // width="24"
    // height="24"
    className="w-[18px]" //animate-bounce-up-down"
  >
    <polygon points="12 2 22 21 2 21" />
  </svg>
  <p className="text-sm ml-1">Top Gainer</p>
  </div>
  );
};

export default GreenUpArrow;
