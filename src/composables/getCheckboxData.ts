import type { IFingering, IOption } from "@/types/MusicalDataTypes";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

export default function getCheckboxData(fing: IFingering): IOption {
  const paramsStore = useParamsStore();
  const { generalParams, currentScale } = storeToRefs(paramsStore);

  const keyNameEn = generalParams.value.key.name.en;
  const altIndex = (keyNameEn.length === 2 && keyNameEn.endsWith("b")) ? 1 : 0;
  const fingNames = currentScale.value[fing.posInScale - 1].names;
  const noteName = fingNames.length > 1 ? fingNames[altIndex].en : fingNames[0].en ;

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
}