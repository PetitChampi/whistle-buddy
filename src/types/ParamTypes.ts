import type { IGaugeValues } from "@/types/UiElements";

interface IGenParams {
  key: { positionId: number, names: string[] }
  frNotation: boolean,
  showOctave: "low" | "high" | "both",
  groupHomophones: boolean,
  instrument: "low" | "tin",
}

interface IFingTableParams {
  fingsPerPage: number,
  flashcardMode: boolean,
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