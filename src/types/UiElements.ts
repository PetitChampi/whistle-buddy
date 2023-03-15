interface IOption {
  value: string,
  displayValue: string,
}

interface ICard {
  id: number,
  name: { en: string, fr: string },
  fingering: number[],
  octave: number
}

interface IGaugeValues {
  unit: string,
  min: number,
  max: number,
  current: number
}

export type { IOption, ICard, IGaugeValues };