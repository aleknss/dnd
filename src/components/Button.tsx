import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  label: string;
  icon?: React.ElementType;
  classProp?: string;
}

interface ButtonNavProps {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
  classProp?: string;
}

export function HeaderButton({ to, label, classProp }: ButtonProps) {
  return (
    <Link
      to={to}
      className={`text-dirty-white hover:text-blue-light font-ptsans cursor-pointer transition duration-200 ${classProp}`}
    >
      <span>{label}</span>
    </Link>
  );
}

export function SecondHeaderButton({
  onClick,
  icon: Icon,
  label,
  classProp,
}: ButtonNavProps) {
  return (
    <a
      onClick={onClick}
      className={`flex flex-row items-center justify-center gap-2 rounded-xs bg-blue-primary hover:bg-blue-dark transition duration-300 px-4 py-2 text-dirty-white font-ptsans cursor-pointer ${classProp}`}
    >
      {Icon && <Icon className="size-6" />}
      <span>{label}</span>
    </a>
  );
}

export function IconButton({ to, icon: Icon, label, classProp }: ButtonProps) {
  return (
    <Link
      to={to}
      className={`flex flex-row items-center justify-center gap-2 rounded-xs bg-blue-primary hover:bg-blue-dark transition duration-300 px-4 py-2 text-dirty-white font-ptsans cursor-pointer ${classProp}`}
    >
      {Icon && <Icon className="size-6" />}
      <span>{label}</span>
    </Link>
  );
}

export function Button({ to, label, classProp }: ButtonProps) {
  return (
    <>
      <Link
        to={to}
        className={`flex flex-row items-center justify-center gap-2 rounded-xs bg-blue-primary hover:bg-blue-dark transition duration-300 px-4 py-2 text-dirty-white font-ptsans cursor-pointer ${classProp}`}
      >
        <span>{label}</span>
      </Link>
    </>
  );
}
