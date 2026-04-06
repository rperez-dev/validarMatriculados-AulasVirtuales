import { useMoodle } from "../../config/context/MoodleContext";

export const MoodleGuard = ({ children }: { children: React.ReactNode }) => {
  const { isReady } = useMoodle();

  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 border rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">
            Configuración requerida
          </h2>
          <p className="text-sm text-gray-500">
            Ingresa tus credenciales de Moodle para continuar
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};