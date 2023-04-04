import { test, expect, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useDarkModeStore } from "@/stores/darkMode";

describe("Store: darkMode", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Switches to dark mode", () => {
    const darkModeStore = useDarkModeStore();
    expect(darkModeStore.darkMode).toBe(false);
    darkModeStore.switchMode();
    expect(darkModeStore.darkMode).toBe(true);
  });
})