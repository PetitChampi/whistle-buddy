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

export type { IOption, ICard };