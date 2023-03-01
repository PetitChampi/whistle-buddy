<template>
  <div class="controls">
    <div class="controls-group">
      <div class="controls-group-item">
        <span class="label">Fingerings per page</span>
        <ListDropdown
          class="block"
          :options="fppOptions"
        />
      </div>
      <div class="controls-group-item">
        <span class="label">Fingerings</span>
        <Dropdown>
          <template v-slot:dropdown-title>
            fingerings
          </template>
          <template v-slot:dropdown-content>
            <div class="settings-container">
              <SettingsGroup
                title="Basic fingerings"
                hasCheckbox
                checkboxLabel="All"
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
                title="Half-holes"
                hasCheckbox
                checkboxLabel="All"
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
                title="Specific fingerings"
                subtitle="Alternative fingerings for certain notes"
                hasCheckbox
                checkboxLabel="All"
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
      <div class="controls-group-item">
        <span class="label">Flashcard mode</span>
        <div class="flex-container">
          <SwitchInput v-model="flashcardMode" />
          <Transition>
            <div v-if="flashcardMode">
              <TextSwitch :options="flashcardOptions" v-model="chosenTxtOption" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <IconButton icon="shuffle" activateOnClick />
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

const fppOptions = ref<IOption[]>([
  { value: "6", displayValue: "6" },
  { value: "10", displayValue: "10" },
  { value: "12", displayValue: "12" },
  { value: "14", displayValue: "All (14)" },
]);
const flashcardMode = ref<boolean>(false);
const flashcardOptions = ref<string[]>(["Fingerings", "Notes"]);
const chosenTxtOption = ref<string>("Fingerings");
const selectedFingerings = ref<string[]>([]);
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &-group {
    display: flex;
    gap: 20px;

    &-item {
      .label {
        display: block;
        margin-bottom: 10px;
        font-size: .875rem;
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
  }
}

.settings-container {
  padding: 20px 20px 30px 30px;
  width: 300px;
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