import { defineStore, acceptHMRUpdate } from "pinia";
import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";
import { useMusicalDataStore } from "@/stores/musicalData";

export const useParamsStore = defineStore("params", () => {
  const musicalDataStore = useMusicalDataStore();

  const currentKey = computed(() => musicalDataStore.notes[2]);
  const currentSelectedFings = computed(() => {
    return musicalDataStore.fingerings.filter(fing => fing.type === "standard");
  });

  const generalParams = useLocalStorage<IGenParams>(
    "general_params", {
      key: currentKey.value,
      frNotation: false,
      showOctave: "low",
      groupHomophones: false,
      instrument: "low",
      selectedFingerings: currentSelectedFings.value
    }
  );
  const fingTableParams = useLocalStorage<IFingTableParams>(
    "fing_table_params", {
      fingsPerPage: 12,
      flashcardMode: false,
      flashcardSide: "fing",
      shuffle: false
    }
  );
  const guessGameParams = useLocalStorage<IGuessGameParams>(
    "guess_game_params", {
      valuesToGuess: "note",
      nbChoices: { unit: "", min: 2, max: 12, current: 3 },
      timer: false,
      timerValues: { unit: "s", min: 2, max: 30, current: 5 }
    }
  );
  const mixMatchParams = useLocalStorage<IMixMatchParams>(
    "mix_match_params", {
      nbOfPairs: { unit: "", min: 2, max: 12, current: 3 },
      timer: false,
      timerValues: { unit: "m", min: 1, max: 5, current: 3 }
    }
  );

  return { generalParams, fingTableParams, guessGameParams, mixMatchParams };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useParamsStore, import.meta.hot))
}
