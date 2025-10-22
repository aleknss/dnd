import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-sm border border-dirty-white overflow-hidden ${className}`}
    >
      <div className="bg-blue-primary text-white p-3">
        <h3 className="font-inknut text-lg">{title}</h3>
      </div>
      <div className="p-4 whitespace-pre-line text-justify">{children}</div>
    </div>
  );
};

export default Card;
