import React from 'react';

const RedDownArrow = () => {
  return (
    <div className="flex items-center justify-start ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ff0000" // Red color
        // width="24"
        // height="24"
        className="w-[18px] transform rotate-180 " // Rotate the triangle for a downward direction
      >
        <polygon points="12 2 22 21 2 21" />
      </svg>
      <p className="text-sm ml-1 ">Top Loser</p>
    </div>
  );
};

export default RedDownArrow;
