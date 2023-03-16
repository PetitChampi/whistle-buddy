import type { IKey, IFingering, IGaugeValues } from "@/types/MusicalDataTypes";

interface IGenParams {
  key: IKey,
  frNotation: boolean,
  showOctave: "low" | "high" | "both",
  groupHomophones: boolean,
  instrument: "low" | "tin",
  selectedFingerings: IFingering[]
}

interface IFingTableParams {
  fingsPerPage: number,
  flashcardMode: boolean,
  flashcardSide: "notes" | "fing",
  shuffle: boolean
}

interface IGuessGameParams {
  valuesToGuess: "note" | "fing",
  nbChoices: IGaugeValues,
  timer: boolean,
  timerValues: IGaugeValues
}

interface IMixMatchParams {
  nbOfPairs: IGaugeValues,
  timer: boolean,
  timerValues: IGaugeValues
}

export type { IGenParams, IFingTableParams, IGuessGameParams, IMixMatchParams };