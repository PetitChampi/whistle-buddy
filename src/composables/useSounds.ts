import type { IFingering, IKey, Octave } from "@/types/MusicalDataTypes";

interface IRawSounds {
  low: string[],
  tin: string[]
}
interface IProcessedSounds {
  lowSounds: string[],
  tinSounds: string[]
}

async function fetchManifest(): Promise<IRawSounds> {
  const response = await fetch("./sounds/sounds-manifest.json");
  const manifest = await response.json();
  return manifest;
}

export async function loadSounds(): Promise<IProcessedSounds> {
  const manifest = await fetchManifest();
  const lowSounds: string[] = manifest.low;
  const tinSounds: string[] = manifest.tin;
  return { lowSounds, tinSounds };
}

export function getSoundUrl(
  sounds: string[], currKey: IKey, fing: IFingering, oct: Octave
): string {
  return sounds[
    (currKey.absolutePos - 1) + (fing.posInScale - 1) + ((oct - 1) * 12)
  ];
};