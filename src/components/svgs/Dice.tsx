import React from "react";

export const Dice = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 11.5V3h8.5M21 11.5V3h-8.5M3 21v-8.5h8.5M21 21v-8.5h-8.5M12 3v18"
    />
    <circle
      cx="8.5"
      cy="8.5"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="15.5"
      cy="8.5"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="8.5"
      cy="15.5"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="15.5"
      cy="15.5"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
    />
  </svg>
);