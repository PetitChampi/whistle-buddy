import { test, expect, describe, vi } from "vitest";
import { loadSounds, getSoundUrl } from "@/composables/useSounds";
import type { IFingering, IKey, Octave } from "@/types/MusicalDataTypes";

describe("Composable set: useSounds.ts", () => {
  test("loadSounds returns expected data", async () => {
    const mockResponse = {
      low: [
        "1_c_1.mp3",
        "2_c#_db_1.mp3",
        "3_d_1.mp3"
      ],
      tin: [
        "1_c_1.mp3",
        "2_c#_db_1.mp3",
        "3_d_1.mp3"
      ],
    };
  
    global.fetch = vi.fn().mockResolvedValue({ json: async () => mockResponse });
  
    const soundsData = await loadSounds();
    
    expect(soundsData).toEqual({
      lowSounds: [
        "1_c_1.mp3",
        "2_c#_db_1.mp3",
        "3_d_1.mp3"
      ],
      tinSounds: [
        "1_c_1.mp3",
        "2_c#_db_1.mp3",
        "3_d_1.mp3"
      ],
    });
  });
  
  test("getSoundUrl returns the correct sound URL", () => {
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
    const result = getSoundUrl(mockSounds, currKey, fing, oct);
  
    expect(result).toBe(expectedSoundUrl);
  });
});
