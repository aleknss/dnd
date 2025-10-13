import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  label: string;
  icon?: React.ElementType;
}

interface ButtonNavProps {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
}

export function HeaderButton({ to, label }: ButtonProps) {
  return (
    <Link
      to={to}
      className="text-dirty-white hover:text-blue-light font-ptsans cursor-pointer"
    >
      <span>{label}</span>
    </Link>
  );
}

export function SecondHeaderButton({
  onClick,
  icon: Icon,
  label,
}: ButtonNavProps) {
  return (
    <a
      onClick={onClick}
      className="flex flex-row items-center justify-center gap-2 rounded-xs bg-blue-primary hover:bg-blue-dark transition duration-300 px-4 py-2 text-dirty-white font-ptsans cursor-pointer"
    >
      {Icon && <Icon className="size-6" />}
      <span>{label}</span>
    </a>
  );
}

export function IconButton({ to, icon: Icon, label }: ButtonProps) {
  return (
    <Link
      to={to}
      className="flex flex-row items-center justify-center gap-2 rounded-xs bg-blue-primary hover:bg-blue-dark transition duration-300 px-4 py-2 text-dirty-white font-ptsans cursor-pointer"
    >
      {Icon && <Icon className="size-6" />}
      <span>{label}</span>
    </Link>
  );
}

export function Button({ to, label }: ButtonProps) {
  return (
    <>
      <Link
        to={to}
        className="flex items-center gap-2 rounded-lg bg-neutral-500 px-4 py-2 text-white transition-colors hover:bg-neutral-600 font-ptsans"
      >
        <span>{label}</span>
      </Link>
    </>
  );
}
