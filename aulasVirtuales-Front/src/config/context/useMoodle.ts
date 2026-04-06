import { useContext } from "react";
import { MoodleContext } from "./MoodleContext";

export const useMoodle = () => {
  const ctx = useContext(MoodleContext);

  if (!ctx) {
    throw new Error("useMoodle must be used inside MoodleProvider");
  }

  return ctx;
};