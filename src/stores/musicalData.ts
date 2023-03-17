import { defineStore, acceptHMRUpdate } from "pinia";
import type { IFingering, IFingsPerType, IInstrument, INote, IKey } from "@/types/MusicalDataTypes";
import { ref, computed } from "vue";

export const useMusicalDataStore = defineStore("musicalData", () => {
  // Raw data
  const instruments = ref<IInstrument[]>([
    { value: "low", fullName: "Low / mezzo whistle" },
    { value: "tin", fullName: "Tin whistle" }
  ]);
  const notes = ref<INote[]>([
    { absolutePos: 1, names: [{ en: "c", fr: "do" }] },
    { absolutePos: 2, names: [{ en: "c#", fr: "do#" }, { en: "db", fr: "réb" }] },
    { absolutePos: 3, names: [{ en: "d", fr: "ré" }] },
    { absolutePos: 4, names: [{ en: "d#", fr: "ré#" }, { en: "eb", fr: "mib" }] },
    { absolutePos: 5, names: [{ en: "e", fr: "mi" }] },
    { absolutePos: 6, names: [{ en: "f", fr: "fa" }] },
    { absolutePos: 7, names: [{ en: "f#", fr: "fa#" }, { en: "gb", fr: "solb" }] },
    { absolutePos: 8, names: [{ en: "g", fr: "sol" }] },
    { absolutePos: 9, names: [{ en: "g#", fr: "sol#" }, { en: "ab", fr: "lab" }] },
    { absolutePos: 10, names: [{ en: "a", fr: "la" }] },
    { absolutePos: 11, names: [{ en: "a#", fr: "la#" }, { en: "bb", fr: "sib" }] },
    { absolutePos: 12, names: [{ en: "b", fr: "si" }] }
  ]);
  const fingerings = ref<IFingering[]>([
    { id: 1, posInScale: 1, holes: [2, 2, 2, 2, 2, 2], type: "standard", octaves: [1] },
    { id: 2, posInScale: 3, holes: [2, 2, 2, 2, 2, 0], type: "standard", octaves: [1, 2] },
    { id: 3, posInScale: 5, holes: [2, 2, 2, 2, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 4, posInScale: 6, holes: [2, 2, 2, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 5, posInScale: 8, holes: [2, 2, 0, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 6, posInScale: 10, holes: [2, 0, 0, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 7, posInScale: 12, holes: [0, 0, 0, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 8, posInScale: 1, holes: [0, 2, 2, 2, 2, 2], type: "standard", octaves: [2] },
    { id: 9, posInScale: 2, holes: [2, 2, 2, 2, 2, 1], type: "halfhole", octaves: [1, 2] },
    { id: 10, posInScale: 4, holes: [2, 2, 2, 2, 1, 0], type: "halfhole", octaves: [1, 2] },
    { id: 11, posInScale: 7, holes: [2, 2, 1, 0, 0, 0], type: "halfhole", octaves: [1, 2] },
    { id: 12, posInScale: 9, holes: [2, 1, 0, 0, 0, 0], type: "halfhole", octaves: [1, 2] },
    { id: 13, posInScale: 11, holes: [1, 0, 0, 0, 0, 0], type: "halfhole", octaves: [1, 2] },
    { id: 14, posInScale: 11, holes: [0, 2, 2, 0, 0, 0], type: "specific", octaves: [1] },
    { id: 15, posInScale: 9, holes: [2, 0, 2, 2, 2, 2], type: "specific", octaves: [1, 2] },
    { id: 16, posInScale: 7, holes: [2, 2, 0, 2, 2, 2], type: "specific", octaves: [1, 2] },
  ]);

  // Getters
  const defaultKey = computed<IKey>(() => {
    const defaultNote = notes.value[2];
    
    return {
      absolutePos: defaultNote.absolutePos,
      name: defaultNote.names[0]
    }
  });
  const defaultSelectedFings = computed<IFingering[]>(() => {
    return fingerings.value.filter(fing => fing.type === "standard");
  });
  const fingsPerType = computed<IFingsPerType>(() => ({
    standard: fingerings.value.filter(fing => fing.type === "standard"),
    halfhole: fingerings.value.filter(fing => fing.type === "halfhole"),
    specific: fingerings.value.filter(fing => fing.type === "specific")
  }));

  return { instruments, notes, fingerings, fingsPerType, defaultKey, defaultSelectedFings };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMusicalDataStore, import.meta.hot));
}