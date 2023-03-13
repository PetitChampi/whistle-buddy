import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core"
import type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";

// General params
export const useGeneralParamsStore = defineStore("generalParams", () => {
  const generalParams = useLocalStorage<IGenParams>(
    "general_params",
    {
      key: { positionId: 3, names: ["d"] },
      frNotation: false,
      showOctave: "low",
      groupHomophones: false,
      instrument: "low"
    }
  );

  return { generalParams };
});

// Fingering table
export const useFingTableParamsStore = defineStore("fingTableParams", () => {
  const fingTableParams = useLocalStorage<IFingTableParams>(
    "fing_table_params",
    {
      fingsPerPage: 12,
      flashcardMode: false,
      flashcardSide: "fing",
      shuffle: false
    }
  );

  return { fingTableParams };
});

// Guessing game
export const useGuessGameParamsStore = defineStore("guessGameParams", () => {
  const guessGameParams = useLocalStorage<IGuessGameParams>(
    "guess_game_params",
    {
      valuesToGuess: "note",
      nbChoices: { unit: "", min: 2, max: 12, default: 3 },
      timer: false,
      timerValues: { unit: "s", min: 2, max: 30, default: 5 }
    }
  );

  return { guessGameParams };
});

// Mix or match
export const useMixMatchParamsStore = defineStore("mixMatchParams", () => {
  const mixMatchParams = useLocalStorage<IMixMatchParams>(
    "mix_match_params",
    {
      nbOfPairs: { unit: "", min: 2, max: 12, default: 3 },
      timer: false,
      timerValues: { unit: "s", min: 2, max: 30, default: 5 }
    }
  );

  return { mixMatchParams };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFingTableParamsStore, import.meta.hot))
}
