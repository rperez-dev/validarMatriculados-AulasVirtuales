type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-[var(--usmp-red)] text-white hover:bg-[var(--usmp-dark)] transition"
    >
      {children}
    </button>
  );
};