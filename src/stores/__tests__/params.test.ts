import { test, expect, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useParamsStore } from "@/stores/params";
import { useMusicalDataStore } from "@/stores/musicalData";
import type { ICard } from "@/types/MusicalDataTypes";

describe("Store: params", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("has correct initial state", () => {
    const paramsStore = useParamsStore();
    const musicalDataStore = useMusicalDataStore();

    expect(paramsStore.generalParams).toEqual({
      key: musicalDataStore.defaultKey,
      frNotation: false,
      showOctave: "both",
      groupHomophones: false,
      instrument: "low",
      selectedFingerings: musicalDataStore.defaultSelectedFings
    });
    expect(paramsStore.fingTableParams).toEqual({
      cardsPerPage: 12,
      flashcardMode: false,
      flashcardSide: "fing",
      shuffle: false
    });
    expect(paramsStore.guessGameParams).toEqual({
      valuesToGuess: "note",
      nbChoices: { unit: "", min: 2, max: 12, current: 3 },
      timer: false,
      timerValues: { unit: "s", min: 2, max: 30, current: 5 }
    });
    expect(paramsStore.mixMatchParams).toEqual({
      nbOfPairs: { unit: "", min: 3, max: 16, current: 9 },
      timer: false,
      timerValues: { unit: "m", min: 1, max: 5, current: 3 }
    });
  });

  test("computes currentScale correctly", () => {
    const paramsStore = useParamsStore();
    const musicalDataStore = useMusicalDataStore();

    const expectedCurrentScale = [
      ...musicalDataStore.notes.slice(paramsStore.generalParams.key.absolutePos - 1),
      ...musicalDataStore.notes.slice(0, paramsStore.generalParams.key.absolutePos - 1),
    ];

    expect(paramsStore.currentScale).toEqual(expectedCurrentScale);
  });

  test("computes currentCardsPerFings correctly", () => {
    const paramsStore = useParamsStore();
  
    paramsStore.generalParams.selectedFingerings = [
      { id: 1, posInScale: 1, holes: [2, 2, 2, 2, 2, 2], type: "standard", octaves: [1] },
      { id: 8, posInScale: 1, holes: [0, 2, 2, 2, 2, 2], type: "standard", octaves: [2] },
      { id: 9, posInScale: 2, holes: [2, 2, 2, 2, 2, 1], type: "halfhole", octaves: [1, 2] },
    ];
    paramsStore.generalParams.key = {
      absolutePos: 1,
      name: { en: "c", fr: "do" }
    };
    paramsStore.generalParams.instrument = "low";

    const expectedCardsPerFings: ICard[] = [
      {
        id: 1,
        name: { en: "c", fr: "do" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[0] ],
        octave: 1,
        soundUrl: "1_c_1.mp3"
      },
      {
        id: 3,
        name: { en: "c#", fr: "do#" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[2] ],
        octave: 1,
        soundUrl: "2_cs_db_1.mp3"
      },
      {
        id: 2,
        name: { en: "c", fr: "do" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[1] ],
        octave: 2,
        soundUrl: "13_c_2.mp3"
      },
      {
        id: 4,
        name: { en: "c#", fr: "do#" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[2] ],
        octave: 2,
        soundUrl: "14_cs_db_2.mp3"
      },
    ];

    expect(paramsStore.currentCardsPerFings).toEqual(expectedCardsPerFings);
  });
  
  test("computes currentCardsPerNote correctly", () => {
    const paramsStore = useParamsStore();

    paramsStore.generalParams.selectedFingerings = [
      { id: 1, posInScale: 1, holes: [2, 2, 2, 2, 2, 2], type: "standard", octaves: [1] },
      { id: 13, posInScale: 11, holes: [1, 0, 0, 0, 0, 0], type: "halfhole", octaves: [1, 2] },
      { id: 14, posInScale: 11, holes: [0, 2, 2, 0, 0, 0], type: "specific", octaves: [1] },
    ];
    paramsStore.generalParams.key = {
      absolutePos: 1,
      name: { en: "c", fr: "do" }
    };
    paramsStore.generalParams.instrument = "low";
  
    const expectedCardsPerNote: ICard[] = [
      {
        id: 1,
        name: { en: "c", fr: "do" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[0] ],
        octave: 1,
        soundUrl: "1_c_1.mp3"
      },
      {
        id: 2,
        name: { en: "a#", fr: "la#" },
        fingerings: [
          paramsStore.generalParams.selectedFingerings[1],
          paramsStore.generalParams.selectedFingerings[2]
        ],
        octave: 1,
        soundUrl: "11_as_bb_1.mp3"
      },
      {
        id: 3,
        name: { en: "a#", fr: "la#" },
        fingerings: [ paramsStore.generalParams.selectedFingerings[1] ],
        octave: 2,
        soundUrl: "23_as_bb_2.mp3"
      },
    ];
    expect(paramsStore.currentCardsPerNote).toEqual(expectedCardsPerNote);
  });
  
  test("computes currentCardsDynamic correctly", () => {
    const paramsStore = useParamsStore();
  
    paramsStore.generalParams.groupHomophones = false;
    expect(paramsStore.currentCardsDynamic).toEqual(paramsStore.currentCardsPerFings);
  
    paramsStore.generalParams.groupHomophones = true;
    expect(paramsStore.currentCardsDynamic).toEqual(paramsStore.currentCardsPerNote);
  });  
});