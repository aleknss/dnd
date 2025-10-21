import React from "react";

interface ColumnConfig {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface TraitsTableProps {
  data: any[];
  columns: ColumnConfig[];
  className?: string;
}

const TraitsTable: React.FC<TraitsTableProps> = ({
  data = [],
  columns = [],
  className = "",
}) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className={`bg-dirty-white rounded-sm overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-3 px-4 text-left font-inknut text-blue-primary border-b border-gray-200"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "" : "bg-white rounded-md"}
            >
              {columns.map((column, colIndex) => {
                const value = item[column.key];
                return (
                  <td
                    key={colIndex}
                    className="py-3 px-4 text-left font-ptsans text-blue-primary"
                  >
                    {column.render ? column.render(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraitsTable;
