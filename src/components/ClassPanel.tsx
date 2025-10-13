import { Link } from "react-router-dom";
import { Arrow } from "./svgs";

interface ClassPanelProps {
  id: string;
  name: string;
  description: string[];
  image: string;
  ability: string;
}

export default function ClassPanel({
  id,
  name,
  description,
  image,
  ability,
}: ClassPanelProps) {
  return (
    <div className="flex flex-row w-full h-[600px] bg-white" id={id}>
      <img src={image} alt={name} className="h-full w-auto" />
      <div className="flex flex-col justify-center gap-10 p-10">
        <div className="flex flex-row items-center gap-2.5">
          <h2 className="font-inknut text-3xl text-blue-dark">{name}</h2>
          <h3 className="font-inknut text-2xl text-red-secondary">{ability}</h3>
        </div>
        <div className="flex flex-col gap-6">
          {description.map((pfs) => (
            <p className="text-blue-primary font-ptsans text-xl ">{pfs}</p>
          ))}
        </div>
        <Link
          to={`/classes/${id}`}
          className="bg-blue-primary hover:bg-blue-dark transition duration-300 w-fit p-3 rounded-xs text-dirty-white"
        >
          <Arrow className="size-10" />
        </Link>
      </div>
    </div>
  );
}
