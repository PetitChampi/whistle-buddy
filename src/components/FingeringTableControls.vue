<template>
  <div class="controls">
    <div class="controls-item">
      <span class="label">{{ $t("F_TABLE_LABEL_FPP") }}</span>
      <ListDropdown
        class="block"
        :options="fppOptions"
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
                  <CheckboxInput v-model="selectedFingerings" value="a" label="A" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="b" label="B" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="c" label="C" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="d" label="D" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="e" label="E" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="f" label="F" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="g" label="G" size="s" />
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
                  <CheckboxInput v-model="selectedFingerings" value="d-hh" label="D" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="e-hh" label="E" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="f-hh" label="F" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="g-hh" label="G" size="s" />
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
                  <CheckboxInput v-model="selectedFingerings" value="d-sp" label="D" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="e-sp" label="E" size="s" />
                  <CheckboxInput v-model="selectedFingerings" value="f-sp" label="F" size="s" />
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
          <SwitchInput v-model="flashcardMode" />
          <Transition>
            <div v-if="flashcardMode">
              <TextSwitch :options="flashcardOptions" v-model="chosenTxtOption" />
            </div>
          </Transition>
        </div>
      </div>
      <div class="controls-button">
        <IconButton icon="shuffle" activateOnClick />
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
import { ref } from "@vue/reactivity";
import type { IOption } from "@/types/UiElements";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const fppOptions = ref<IOption[]>([
  { value: "6", displayValue: "6" },
  { value: "10", displayValue: "10" },
  { value: "12", displayValue: "12" },
  { value: "14", displayValue: "All (14)" },
]);
const flashcardMode = ref<boolean>(false);
const flashcardOptions = ref<string[]>([t("GEN_FINGERINGS"), t("GEN_NOTES")]);
const chosenTxtOption = ref<string>(t("GEN_FINGERINGS"));
const selectedFingerings = ref<string[]>([]);
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
    column-gap: 30px;
    row-gap: 10px;
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