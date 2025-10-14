import React from "react";

export const RightArrow = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="m13 17.5l5.5-5.5L13 6.5m4.25 5.5h-13"
    />
  </svg>
);
