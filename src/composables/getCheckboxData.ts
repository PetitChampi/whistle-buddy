import type { IFingering, IOption } from "@/types/MusicalDataTypes";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const paramsStore = useParamsStore();
const { generalParams, currentScale } = storeToRefs(paramsStore);

export default function getCheckboxData(fing: IFingering): IOption {
  const keyNameEn = generalParams.value.key.name.en;
  const altIndex = (keyNameEn.length === 2 && keyNameEn.endsWith("b")) ? 1 : 0;
  const noteName = currentScale.value[fing.posInScale - 1].names[altIndex || 0].en;

  return {
    value: `${fing.id}`,
    displayValue: `${
      noteName.charAt(0).toUpperCase()
    }${
      noteName.slice(1)
    }${
      fing.octaves[0] === 2 ? "+" : ""
    }`
  };
};