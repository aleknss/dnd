import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  icon?: React.ElementType;
  label: string;
}

export function HeaderButton({ to, label }: ButtonProps) {
  return (
    <Link to={to} className="text-dirty-white">
      <span>{label}</span>
    </Link>
  );
}

export function IconButton({ to, icon: Icon, label }: ButtonProps) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 w-24 rounded-lg bg-neutral-500 px-4 py-2 text-white transition-colors hover:bg-neutral-600"
    >
      {Icon && <Icon className="size-8" />}
      <span>{label}</span>
    </Link>
  );
}

export function Button({ to, label }: ButtonProps) {
  return (
    <>
      <Link
        to={to}
        className="flex items-center gap-2 rounded-lg bg-neutral-500 px-4 py-2 text-white transition-colors hover:bg-neutral-600"
      >
        <span>{label}</span>
      </Link>
    </>
  );
}
