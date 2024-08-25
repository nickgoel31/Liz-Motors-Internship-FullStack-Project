import React from 'react';

const RoundedProgressBar = ({ progress }:{progress:number}) => {
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center gap-2">
        <p className='text-sm font-semibold'>{progress}%</p>
      <svg
        className="transform rotate-90"
        width="40"
        height="40"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
          className="transition-all duration-300"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

export default RoundedProgressBar;
