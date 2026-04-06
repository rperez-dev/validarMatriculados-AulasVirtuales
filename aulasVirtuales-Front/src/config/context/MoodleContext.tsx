import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface MoodleConfig {
  baseUrl: string;
  sesskey: string;
  cookie: string;
}

export interface MoodleContextType {
  config: MoodleConfig | null;
  setConfig: (config: MoodleConfig) => void;
  isReady: boolean;
}

export const MoodleContext = createContext<MoodleContextType | null>(null);

export const MoodleProvider = ({ children }: { children: ReactNode }) => {

  const [config, setConfigState] = useState<MoodleConfig | null>(() => {
    try {
      const saved = sessionStorage.getItem("moodle");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setConfig = (cfg: MoodleConfig) => {
    sessionStorage.setItem("moodle", JSON.stringify(cfg));
    setConfigState(cfg);
  };

  return (
    <MoodleContext.Provider
      value={{
        config,
        setConfig,
        isReady: !!config,
      }}
    >
      {children}
    </MoodleContext.Provider>
  );
};