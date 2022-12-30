import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkMode", () => {
  const darkMode = ref(false);
  function switchMode() {
    darkMode.value = !darkMode.value;
  };

  return { darkMode, switchMode };
});
