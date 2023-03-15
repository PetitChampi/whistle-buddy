import { defineStore, acceptHMRUpdate } from "pinia";
import type { IFingering, IFingsPerType, IInstrument, INote } from "@/types/MusicalDataTypes";
import { ref, computed } from "vue";
import { useParamsStore } from "@/stores/params";

export const useMusicalDataStore = defineStore("musicalData", () => {
  const paramsStore = useParamsStore();

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
    { id: 1, posInScale: 1, holes: [2, 2, 1, 0, 0, 0], type: "halfhole", octaves: [1, 2] },
    { id: 2, posInScale: 1, holes: [2, 2, 1, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 3, posInScale: 2, holes: [2, 2, 1, 0, 0, 0], type: "standard", octaves: [1, 2] },
    { id: 4, posInScale: 2, holes: [2, 2, 1, 0, 0, 0], type: "specific", octaves: [1, 2] }
  ]);

  // Getters
  const fingsPerType = computed<IFingsPerType>(() => {
    return {
      standard: fingerings.value.filter(fing => fing.type === "standard"),
      halfhole: fingerings.value.filter(fing => fing.type === "halfhole"),
      specific: fingerings.value.filter(fing => fing.type === "specific")
    }
  });
  const currentScale = computed<INote[]>(() => {
    const firstHalf = notes.value.slice(paramsStore.generalParams.key.absolutePos - 1);
    const secondHalf = notes.value.slice(0, paramsStore.generalParams.key.absolutePos - 1);

    return [...firstHalf, ...secondHalf];
  });
  // TODO currentCards

  return { instruments, notes, fingerings, fingsPerType, currentScale };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMusicalDataStore, import.meta.hot));
}