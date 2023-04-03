import { test, expect, vi } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useParamsStore } from "@/stores/params";
import getCheckboxData from "@/composables/getCheckboxData";
import type { IFingering } from "@/types/MusicalDataTypes";

test("gets the correct checkbox data", () => {
  const testPinia = createTestingPinia({ fakeApp: true, createSpy: vi.fn() });
  setActivePinia(testPinia);
  const paramsStore = useParamsStore();

  paramsStore.generalParams.key = {
    absolutePos: 1,
    name: { en: "C", fr: "do" }
  };

  const fing1: IFingering = { id: 1, posInScale: 1, holes: [], type: "standard", octaves: [1] }
  const fing2: IFingering = { id: 2, posInScale: 6, holes: [], type: "halfhole", octaves: [2] }

  expect(getCheckboxData(fing1), "fing1 failed").toEqual(
    { value: "1", displayValue: "C" }
  );
  expect(getCheckboxData(fing2), "fing2 failed").toEqual(
    { value: "2", displayValue: "F+" }
  );
});