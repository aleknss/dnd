import { HeaderButton } from "../components/Button";
import { Link } from "react-router-dom";
import { Dnd } from "../components/svgs/Dnd";

export default function Header() {
  return (
    <>
      <div className="w-full bg-blue-primary h-16 flex flex-row justify-center items-center gap-8 sticky top-0">
        <HeaderButton to="/classes" label="Clases" />
        <Link
          className="text-dirty-white hover:text-blue-light transition duration-200"
          to="/"
        >
          <Dnd className="h-12" />
        </Link>
        <HeaderButton to="/races" label="Razas" />
      </div>
    </>
  );
}
