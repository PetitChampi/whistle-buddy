import type { IFingering, IKey, Octave } from "@/types/MusicalDataTypes";

export function getSoundUrl(
  sounds: string[], currKey: IKey, fing: IFingering, oct: Octave
): string {
  return sounds[
    (currKey.absolutePos - 1) + (fing.posInScale - 1) + ((oct - 1) * 12)
  ];
}