import { test, expect, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMusicalDataStore } from "@/stores/musicalData";

describe("Store: musicalData", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("has correct initial state", () => {
    const musicalDataStore = useMusicalDataStore();

    expect(musicalDataStore.instruments).toHaveLength(2);
    expect(musicalDataStore.notes).toHaveLength(12);
    expect(musicalDataStore.fingerings).toHaveLength(16);
  });

  test("computes defaultKey correctly", () => {
    const musicalDataStore = useMusicalDataStore();

    expect(musicalDataStore.defaultKey).toEqual({
      absolutePos: 3,
      name: { en: "d", fr: "ré" },
    });
  });

  test("computes defaultSelectedFings correctly", () => {
    const musicalDataStore = useMusicalDataStore();

    const standardFings = musicalDataStore.fingerings.filter(
      (fing) => fing.type === "standard"
    );

    expect(musicalDataStore.defaultSelectedFings).toEqual(standardFings);
  });

  test("computes fingsPerType correctly", () => {
    const musicalDataStore = useMusicalDataStore();

    const standardFings = musicalDataStore.fingerings.filter(
      (fing) => fing.type === "standard"
    );
    const halfholeFings = musicalDataStore.fingerings.filter(
      (fing) => fing.type === "halfhole"
    );
    const specificFings = musicalDataStore.fingerings.filter(
      (fing) => fing.type === "specific"
    );

    expect(musicalDataStore.fingsPerType).toEqual({
      standard: standardFings,
      halfhole: halfholeFings,
      specific: specificFings,
    });
  });
});