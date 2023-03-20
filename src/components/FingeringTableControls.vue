<template>
  <div class="controls">
    <div class="controls-item">
      <span class="label">{{ $t("F_TABLE_LABEL_FPP") }}</span>
      <ListDropdown
        class="block"
        :options="fppOptions"
        :defaultSelectedOption="`${fingTableParams.fingsPerPage}`"
        closeOnInteraction
        @@optionSelected="fingTableParams.fingsPerPage = Number($event.value)"
      />
    </div>
    <div class="controls-item">
      <span class="label">{{ $t("GEN_FINGERINGS") }}</span>
      <Dropdown type="settings">
        <template v-slot:dropdown-title>
          fingerings
        </template>
        <template v-slot:dropdown-content>
          <div class="settings-container">
            <SettingsGroup
              :title="$t('GEN_STANDARD_L')"
              hasCheckbox
              :checkboxLabel="$t('GEN_ALL')"
              accordion
              openByDefault
            >
              <template v-slot:content>
                <div class="checkbox-grid">
                  <CheckboxInput
                    v-for="fing in fingsPerType.standard"
                    :key="fing.id"
                    v-model="selectedFings"
                    :value="`${getCheckboxData(fing).value}-st`"
                    :label="getCheckboxData(fing).displayValue"
                    size="s"
                  />
                </div>
              </template>
            </SettingsGroup>

            <SettingsGroup
              :title="$t('GEN_HALFHOLE')"
              hasCheckbox
              :checkboxLabel="$t('GEN_ALL')"
              accordion
            >
              <template v-slot:content>
                <div class="checkbox-grid">
                  <CheckboxInput
                    v-for="fing in fingsPerType.halfhole"
                    :key="fing.id"
                    v-model="selectedFings"
                    :value="`${getCheckboxData(fing).value}-hh`"
                    :label="getCheckboxData(fing).displayValue"
                    size="s"
                  />
                </div>
              </template>
            </SettingsGroup>

            <SettingsGroup
              :title="$t('GEN_SPECIFIC_L')"
              :subtitle="$t('GEN_SUBTITLE_SPECIFIC')"
              hasCheckbox
              :checkboxLabel="$t('GEN_ALL')"
              accordion
            >
              <template v-slot:content>
                <div class="checkbox-grid">
                  <CheckboxInput
                    v-for="fing in fingsPerType.specific"
                    :key="fing.id"
                    v-model="selectedFings"
                    :value="`${getCheckboxData(fing).value}-sp`"
                    :label="getCheckboxData(fing).displayValue"
                    size="s"
                  />
                </div>
              </template>
            </SettingsGroup>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="controls-group">
      <div class="controls-item">
        <span class="label">{{ $t("F_TABLE_LABEL_FLASHCARD_MODE") }}</span>
        <div class="flex-container">
          <SwitchInput v-model="fingTableParams.flashcardMode" />
          <Transition>
            <div v-if="fingTableParams.flashcardMode">
              <TextSwitch :options="flashcardOptions" v-model="fingTableParams.flashcardSide" />
            </div>
          </Transition>
        </div>
      </div>
      <div class="controls-button">
        <IconButton
          icon="shuffle"
          activateOnClick
          :active="fingTableParams.shuffle"
          @@activateBtn="fingTableParams.shuffle = !fingTableParams.shuffle"
          v-tooltip="{ text: $t('GEN_SHUFFLE') }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from "@/components/molecules/IconButton.vue";
import SwitchInput from "@/components/molecules/SwitchInput.vue";
import Dropdown from "@/components/molecules/Dropdown.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import TextSwitch from "@/components/molecules/TextSwitch.vue";
import SettingsGroup from "@/components/SettingsGroup.vue";
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import { ref, computed } from "vue";
import type { IFingering, IOption } from "@/types/MusicalDataTypes";
import { useI18n } from "vue-i18n";
import { useParamsStore } from "@/stores/params";
import { useMusicalDataStore } from "@/stores/musicalData";
import { storeToRefs } from "pinia";

const { t } = useI18n({ useScope: "global" });

const paramsStore = useParamsStore();
const musicalDataStore = useMusicalDataStore();
const { generalParams, fingTableParams, currentCardsDynamic, currentScale } = storeToRefs(paramsStore);
const { fingsPerType } = storeToRefs(musicalDataStore);

const selectedFings = ref<string[]>([]);

const fppOptions = computed<IOption[]>(() => {
  const options: IOption[] = [];
  options.push({
    value: `${currentCardsDynamic.value.length}`,
    displayValue: `${t("GEN_ALL")} (${currentCardsDynamic.value.length})`,
  });
  for (let i = 1; i <= 12; i++) {
    if (i !== currentCardsDynamic.value.length) options.push({ value: `${i}`, displayValue: `${i}` });
  }
  return options;
});

function getCheckboxData(fing: IFingering): IOption {
  const keyNameEn = generalParams.value.key.name.en;
  const altIndex = (keyNameEn.length === 2 && keyNameEn.endsWith("b")) ? 1 : 0;
  const noteName = currentScale.value[fing.posInScale - 1].names[altIndex || 0].en;

  return {
    value: noteName,
    displayValue: `${
      noteName.charAt(0).toUpperCase()
    }${
      noteName.slice(1)
    }${
      fing.octaves[0] === 2 ? "+" : ""
    }`
  };
};

const flashcardOptions = computed<IOption[]>(() => [
  { value: "fing", displayValue: t("GEN_FINGERINGS") },
  { value: "notes", displayValue: t("GEN_NOTES") },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.controls {
  display: flex;
  gap: 20px;
  @media screen and (max-width: $mobile) {
    flex-wrap: wrap;
  }

  &-group {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-basis: 50%;
  }

  &-item {
    .label {
      display: block;
      margin-bottom: 10px;
      font-size: .875rem;
      @media screen and (max-width: $mobile) {
        margin-bottom: 5px;
      }
    }
    .block {
      display: block;
    }
    .flex-container {
      display: flex;
      align-items: flex-end;
      gap: 15px;
    }
  }
  &-button {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }
}

.settings-container {
  padding: 20px 20px 30px 30px;
  width: 330px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(3, min-content);
    gap: 10px 30px;
  }
}

// transition classes
.v {
  &-enter-active,
  &-leave-active {
    transition: opacity .4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>