import dnd from "../assets/svg/d&d.svg";
import { HeaderButton } from "./Button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="w-full bg-blue-primary h-16 flex flex-row justify-center items-center">
        <HeaderButton to="/classes" label="Clases" />
        <Link to="/">
          <img className="text-dirty-white" src={dnd} alt="Logo D&D" />
        </Link>
        <HeaderButton to="/races" label="Razas" />
      </div>
    </>
  );
}
