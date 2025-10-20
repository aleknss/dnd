import React from "react";

export const Tree = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 8V6L8 0L14 6V8H11L14 11V13H9V16H7V13H2V11L5 8H2Z"
      fill="currentColor"
    />
  </svg>
);
