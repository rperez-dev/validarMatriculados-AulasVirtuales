import { useState } from "react";
import { useMoodle } from "../../config/context/useMoodle";

export default function MoodleConfigModal() {
  const { isReady, setConfig } = useMoodle();

  const [baseUrl, setBaseUrl] = useState("");
  const [sesskey, setSesskey] = useState("");
  const [cookie, setCookie] = useState("");

  const handleSave = () => {
    if (!baseUrl || !sesskey || !cookie) {
      alert("Completa todos los campos");
      return;
    }

    setConfig({ baseUrl, sesskey, cookie });
  };

  // 🔥 si ya está configurado, no mostrar
  if (isReady) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

      <div className="bg-white rounded-xl w-[500px] p-6 shadow-lg flex flex-col gap-4">

        <h2 className="text-lg font-semibold">
          Configuración de Moodle
        </h2>

        <input
          placeholder="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Sesskey"
          value={sesskey}
          onChange={(e) => setSesskey(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Cookie"
          value={cookie}
          onChange={(e) => setCookie(e.target.value)}
          className="border p-2 rounded h-24"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 rounded"
        >
          Guardar
        </button>

      </div>
    </div>
  );
}