import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core"
import type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";

export const useParamsStore = defineStore("params", () => {
  const generalParams = useLocalStorage<IGenParams>(
    "general_params", {
      key: { positionId: 3, names: ["d"] },
      frNotation: false,
      showOctave: "low",
      groupHomophones: false,
      instrument: "low"
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
