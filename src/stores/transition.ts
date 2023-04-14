import { defineStore } from "pinia";

export const useTransitionStore = defineStore("transition", () => {
  const transitionDelay = 0;

  return { transitionDelay };
});
