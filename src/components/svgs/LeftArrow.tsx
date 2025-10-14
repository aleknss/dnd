import React from "react";

export const LeftArrow = (props: React.SVGProps<SVGSVGElement>) => (
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
      stroke-linecap="square"
      stroke-width="3"
      d="m11 17.5l-5.5-5.5l5.5-5.5m-4.25 5.5h13"
    />
  </svg>
);