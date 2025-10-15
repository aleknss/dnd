import React from "react";

interface InfoTableProps {
  data: Array<{
    label: string;
    value: React.ReactNode;
  }>;
}

export default function InfoTable({ data }: InfoTableProps) {
  return (
    <div className="w-[640px] bg-dirty-white p-2.5 rounded-sm">
      {data.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-12 py-5 ${
            index % 2 === 1 ? "bg-white rounded-sm" : ""
          }`}
        >
          <div className="col-span-5">
            <p className="font-inknut text-blue-dark">{item.label}</p>
          </div>
          <div className="col-span-7">
            <p className="font-ptsans text-blue-primary">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
