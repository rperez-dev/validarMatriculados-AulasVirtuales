export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <img src="/logo.png" className="w-20 animate-pulse mx-auto" />
        <div className="w-40 h-1 bg-[var(--usmp-red)] mt-5 animate-pulse rounded"></div>
      </div>
    </div>
  );
};