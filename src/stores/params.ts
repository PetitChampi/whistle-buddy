import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";
import type { IFingering, INote, ICard, Octave } from "@/types/MusicalDataTypes";
import { useMusicalDataStore } from "@/stores/musicalData";
import { useSounds } from "@/composables/useSounds";
import { soundsManifest } from "@/sounds-manifest";

export const useParamsStore = defineStore("params", () => {
  // Data from musical data store
  const musicalDataStore = useMusicalDataStore();
  const notes = computed(() => musicalDataStore.notes);
  const defaultKey = computed(() => musicalDataStore.defaultKey);
  const defaultSelectedFings = computed(() => musicalDataStore.defaultSelectedFings);

  // Initial state
  const generalParams = useLocalStorage<IGenParams>(
    "general_params", {
      key: defaultKey.value,
      frNotation: false,
      showOctave: "both",
      groupHomophones: false,
      instrument: "low",
      selectedFingerings: defaultSelectedFings.value
    }
  );
  const fingTableParams = useLocalStorage<IFingTableParams>(
    "fing_table_params", {
      cardsPerPage: 12,
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

  const currentSounds = computed<string[]>(() => {
    return generalParams.value.instrument === "low" ? soundsManifest.low : soundsManifest.tin;
  });
  
  const currentCardsPerFings = computed<ICard[]>(() => {
    const selectedFings = generalParams.value.selectedFingerings;
    const currKey = generalParams.value.key;
    const alterationIndex = (currKey.name.en.length === 2 && currKey.name.en.endsWith("b")) ? 1 : 0;
    let i = 0;

    const noHomo = selectedFings.flatMap((fing: IFingering) => {
      const note = currentScale.value[fing.posInScale - 1];
      const noteName = note.names.length > 1 ? note.names[alterationIndex] : note.names[0];

      return fing.octaves.map((oct: Octave) => ({
        id: ++i,
        name: noteName,
        fingerings: [ fing ],
        octave: oct,
        soundUrl: useSounds(currentSounds.value, currKey, fing, oct)
      }));
    });

    noHomo.sort((a, b) => { 
      return a.fingerings[0].posInScale - b.fingerings[0].posInScale;
    });
    noHomo.sort((a, b) => { 
      return a.octave - b.octave;
    });

    switch (generalParams.value.showOctave) {
      case "low":
        return noHomo.filter(item => item.octave === 1);
      case "high":
        return noHomo.filter(item => item.octave === 2);
      default:
        return noHomo;
    }
  });

  const currentCardsPerNote = computed<ICard[]>(() => {
    const selectedFings = generalParams.value.selectedFingerings;
    const currKey = generalParams.value.key;
    const alterationIndex = (currKey.name.en.length === 2 && currKey.name.en.endsWith("b")) ? 1 : 0;
    let i = 0;

    const yesHomo: ICard[] = currentScale.value.map((note: INote, index) => {
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
      
      return fingsGroupedByOctave.map((fingSet: IFingering[], index: number) => {
        return {
          id: ++i,
          name: note.names.length > 1 ? note.names[alterationIndex] : note.names[0],
          fingerings: fingSet,
          octave: uniqueOctaves[index],
          soundUrl: useSounds(currentSounds.value, currKey, fingSet[0], uniqueOctaves[index])
        }
      });
    }).flat();

    yesHomo.sort((a, b) => { 
      return a.octave - b.octave;
    });

    switch (generalParams.value.showOctave) {
      case "low":
        return yesHomo.filter(item => item.octave === 1);
      case "high":
        return yesHomo.filter(item => item.octave === 2);
      default:
        return yesHomo;
    }
  });

  const currentCardsDynamic = computed<ICard[]>(() => {
    return generalParams.value.groupHomophones ? currentCardsPerNote.value : currentCardsPerFings.value;
  });

  watch(() => currentCardsDynamic.value, (newCards, oldCards) => {
    if (fingTableParams.value.cardsPerPage === oldCards.length) {
      fingTableParams.value.cardsPerPage = newCards.length;
    }
  });

  // Actions
  // TODO function getRandomCards(nb: number) ===> w/ currentCardsPerNote (no homophones in this game)

  return {
    generalParams,
    fingTableParams,
    guessGameParams,
    mixMatchParams,
    currentScale,
    currentCardsPerFings,
    currentCardsPerNote,
    currentCardsDynamic
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useParamsStore, import.meta.hot));
}
