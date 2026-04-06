export const Header = () => {

  return (
    <header className="bg-white shadow-md">
      <div className="bg-[var(--usmp-red)] text-white px-5 py-2 text-sm flex justify-between">
        <span>Sistema Aulas Virtuales</span>

      </div>

      <div className="max-w-6xl mx-auto p-5 flex items-center gap-5">
        <img src="/logo.png" className="w-14" />

        <div>
          <h1 className="text-xl font-bold text-[var(--usmp-red)]">
            USMP
          </h1>
          <p className="text-sm text-gray-500">
            Plataforma Académica
          </p>
        </div>
      </div>
    </header>
  );
};