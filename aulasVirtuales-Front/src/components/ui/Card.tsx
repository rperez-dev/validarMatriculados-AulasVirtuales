import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  icon?: string;
  to?: string; // 🔥 clave
};

export const Card = ({ title, description, icon, to }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className="card cursor-pointer hover:scale-105"
    >
      {icon && <img src={icon} className="w-10 mb-4" />}

      <h3 className="text-[var(--usmp-red)] font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};