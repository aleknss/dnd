import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function Button({ to, icon, label }: ButtonProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
