import React from 'react';

interface TextPathProps {
  text: string;
  className?: string;
}

export function TextPath({ text, className = '' }: TextPathProps) {
  return (
    <svg className={`w-full h-full ${className}`}>
      <defs>
        <path
          id="textPath"
          d={`M20,50 H${text.length * 120}`}
          fill="none"
        />
      </defs>
      <text
        className="text-[8rem] fill-gray-200 select-none"
        dominantBaseline="middle"
        textAnchor="start"
      >
        <textPath href="#textPath" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}