import type { Octave } from "@/types/UiElements";

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

export type { IInstrument, INoteName, INote, IFingering, IFingsPerType };