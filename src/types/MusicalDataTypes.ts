// UI elements

type Octave = 1 | 2;

interface IOption {
  value: string,
  displayValue: string,
}
interface ICard {
  id: number,
  name: INoteName,
  fingerings: IFingering[],
  octave: Octave,
  soundUrl: string
}
interface IGaugeValues {
  unit: string,
  min: number,
  max: number,
  current: number
}

// Musical data

interface IInstrument {
  value: string,
  fullName: string
}
interface INoteName {
  en: string,
  fr: string
}
interface INote {
  absolutePos: number,
  names: INoteName[]
}
interface IKey {
  absolutePos: number,
  name: INoteName
}
interface IFingering {
  id: number,
  posInScale: number,
  holes: number[],
  type: "standard" | "halfhole" | "specific",
  octaves: Octave[]
}
interface IFingsPerType {
  standard: IFingering[],
  halfhole: IFingering[],
  specific: IFingering[]
}

export type { IInstrument, INoteName, INote, IKey, IFingering, IFingsPerType, Octave, IOption, ICard, IGaugeValues };