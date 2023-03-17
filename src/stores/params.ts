import { defineStore, acceptHMRUpdate } from "pinia";
import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";
import type { IFingering, INote, ICard, Octave } from "@/types/MusicalDataTypes";
import { useMusicalDataStore } from "@/stores/musicalData";

export const useParamsStore = defineStore("params", () => {
  // Data from musical data store
  const musicalDataStore = useMusicalDataStore();
  const notes = computed(() => musicalDataStore.notes);
  const defaultKey = computed(() => musicalDataStore.defaultKey);
  const defaultSelectedFings = computed(() => musicalDataStore.defaultSelectedFings);

  // Schema refs
  const generalParams = useLocalStorage<IGenParams>(
    "general_params", {
      key: defaultKey.value,
      frNotation: false,
      showOctave: "low",
      groupHomophones: false,
      instrument: "low",
      selectedFingerings: defaultSelectedFings.value
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
      nbOfPairs: { unit: "", min: 3, max: 16, current: 9 },
      timer: false,
      timerValues: { unit: "m", min: 1, max: 5, current: 3 }
    }
  );

  // Getters
  const currentScale = computed<INote[]>(() => {
    const firstHalf = notes.value.slice(generalParams.value.key.absolutePos - 1);
    const secondHalf = notes.value.slice(0, generalParams.value.key.absolutePos - 1);

    return [...firstHalf, ...secondHalf];
  });
  const currentCardsPerFings = computed<ICard[]>(() => {
    const selectedFings = generalParams.value.selectedFingerings;
    const currentScaleValue = currentScale.value;
    let i = 0;

    const noHomo = selectedFings.flatMap((fing: IFingering) => {
      const note = currentScaleValue[fing.posInScale - 1];
      return fing.octaves.map((oct: Octave) => ({
        id: ++i,
        name: note.names[0],
        fingerings: [ fing ],
        octave: oct
      }));
    });

    return noHomo.sort((a, b) => { 
      return a.octave - b.octave;
    });
  });
  const currentCardsPerNote = computed<ICard[]>(() => {
    const selectedFings = generalParams.value.selectedFingerings;
    const currKey = generalParams.value.key;
    const currentScaleValue = currentScale.value;
    const alterationIndex = (currKey.name.en.length === 2 && currKey.name.en.endsWith("b")) ? 1 : 0;
    let i = 0;

    const yesHomo: ICard[] = currentScaleValue.map((note: INote, index) => {
      // Get all fings that have the same posInScale as the note's index + 1
      const fingsForNote = selectedFings.filter((fing) => fing.posInScale === index + 1);
      // Flatten octaves from all those fings into a single array
      const octaves = fingsForNote.reduce((result: Octave[], fingering: IFingering) => {
        return result.concat(fingering.octaves);
      }, []);
      // Remove duplicates from octaves array
      const uniqueOctaves = [...new Set(octaves)];
      // For each unique octave, create sub-array of fings that have that octave
      const fingsGroupedByOctave = uniqueOctaves.map((oct) => {
        return fingsForNote.filter((fingering) => fingering.octaves.includes(oct));
      });
      
      return fingsGroupedByOctave.map((fingSet: IFingering[], index) => {
        return {
          id: ++i,
          name: note.names[note.names.length > 1 ? alterationIndex : 0],
          fingerings: fingSet,
          octave: uniqueOctaves[index]
        }
      });
    }).flat();

    return yesHomo.sort((a, b) => { 
      return a.octave - b.octave;
    });
  });

  // Actions
  // TODO function getRandomCards(nb: number) ===> w/ currentCardsPerNote (no homophones in this game)

  return { generalParams, fingTableParams, guessGameParams, mixMatchParams, currentScale, currentCardsPerFings, currentCardsPerNote };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useParamsStore, import.meta.hot));
}
