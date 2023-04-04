import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useDarkModeStore = defineStore("darkMode", () => {
  const darkMode = useLocalStorage("dark_mode", false);
  function switchMode() {
    darkMode.value = !darkMode.value;
  };

  return { darkMode, switchMode };
});
