type Octave = 1 | 2;

interface IOption {
  value: string,
  displayValue: string,
}

interface ICard {
  id: number,
  name: { en: string, fr: string },
  fingering: number[],
  octave: Octave
}

interface IGaugeValues {
  unit: string,
  min: number,
  max: number,
  current: number
}

export type { Octave, IOption, ICard, IGaugeValues };