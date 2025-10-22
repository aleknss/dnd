import { Link } from "react-router-dom";
import { RightArrow } from "./svgs/classes";

interface InfoTableItem {
  label: string;
  value: string | React.ReactNode;
}

interface ClassPanelProps {
  id: string;
  name: string;
  description: string[];
  image: string;
  ability: string;
  infoTableData?: InfoTableItem[];
}

export default function ClassPanel({
  id,
  name,
  description,
  image,
  ability,
  infoTableData,
}: ClassPanelProps) {
  return (
    <div
      className="flex flex-col md:flex-row w-full min-h-[600px] bg-white"
      id={id}
    >
      <img
        src={image}
        alt={name}
        className="h-72 w-full md:w-auto md:h-full object-cover object-top"
      />
      <div className="flex flex-col justify-center gap-10 p-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-2.5">
          <h2 className="font-inknut text-2xl md:text-3xl text-blue-dark">
            {name}
          </h2>
          <h3 className="font-inknut text-xl md:text-2xl text-red-secondary">
            {ability}
          </h3>
        </div>
        <div className="flex flex-col gap-6">
          {description.map((pfs, index) => (
            <p
              key={index}
              className="text-blue-primary font-ptsans text-base md:text-lg text-justify"
            >
              {pfs}
            </p>
          ))}
        </div>
        {infoTableData && infoTableData.length > 0 && (
          <div className="bg-dirty-white p-4 rounded-sm">
            {infoTableData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 py-3 ${
                  index % 2 === 1 ? "bg-white rounded-md" : ""
                }`}
              >
                <div className="col-span-5 flex items-center">
                  <p className="font-inknut text-blue-dark">{item.label}</p>
                </div>
                <div className="col-span-7 flex items-center">
                  <p className="font-ptsans text-blue-primary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to={`/dnd/classes/${id}`}
          className="bg-blue-primary hover:bg-blue-dark transition duration-300 w-full flex justify-center md:w-fit p-3 rounded-xs text-dirty-white"
        >
          <RightArrow className="size-8 md:size-10" />
        </Link>
      </div>
    </div>
  );
}
