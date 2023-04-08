import { test, expect } from "vitest";
import { useSounds } from "@/composables/useSounds";
import type { IFingering, IKey, Octave } from "@/types/MusicalDataTypes";

test("useSounds returns the correct sound URL", () => {
  const mockSounds = [
    "sound_0.mp3",
    "sound_1.mp3",
    "sound_2.mp3",
    "sound_3.mp3",
  ];
  const currKey: IKey = {
    absolutePos: 2,
    name: { en: "A", fr: "La" },
  };
  const fing: IFingering = {
    id: 1,
    posInScale: 3,
    holes: [0, 1, 1, 1, 0, 1, 1],
    type: "standard",
    octaves: [1, 2],
  };
  const oct: Octave = 1;

  const expectedSoundUrl = "sound_3.mp3";
  const result = useSounds(mockSounds, currKey, fing, oct);

  expect(result).toBe(expectedSoundUrl);
});
