<template>
  <Dropdown type="settings">
    <template #dropdown-title>
      <span class="icon-settings" />
    </template>
    <template #dropdown-content>
      <div class="settings-container">
        <SettingsGroup
          :title="$t('GEN_PARAMS_FR_NOTATION')"
          subtitle="Do, Ré, Mi..."
          hasCheckbox
          :checkboxModelValue="generalParams.frNotation"
          @@updateCheckbox="generalParams.frNotation = $event"
        />

        <SettingsGroup
          v-if="route.name !== 'guessingGame' && route.name !== 'mixOrMatch'"
          :title="$t('GEN_PARAMS_SHOW_OCTAVE')"
        >
          <template #content>
            <div class="radio-group">
              <RadioInput
                v-model="generalParams.showOctave"
                groupName="octave"
                value="low"
                label="1"
                small
              />
              <RadioInput
                v-model="generalParams.showOctave"
                groupName="octave"
                value="high"
                label="2"
                small
              />
              <RadioInput
                v-model="generalParams.showOctave"
                groupName="octave"
                value="both"
                label="1 + 2"
                small
              />
            </div>
          </template>
        </SettingsGroup>

        <SettingsGroup
          v-if="route.name !== 'guessingGame' && route.name !== 'mixOrMatch'"
          :title="$t('GEN_PARAMS_GROUP_HOMOPHONES')"
          :subtitle="$t('GEN_PARAMS_SUBTITLE_HOMO')"
          hasCheckbox
          :checkboxModelValue="generalParams.groupHomophones"
          @@updateCheckbox="generalParams.groupHomophones = $event"
        />

        <!-- <SettingsGroup
          :title="$t('GEN_PARAMS_SYNESTHESIA')"
          :subtitle="$t('GEN_PARAMS_SUBTITLE_SYN')"
          hasCheckbox
          accordion
        >
          <template v-slot:content>
            Insert colour pickers here
          </template>
        </SettingsGroup> -->

        <SettingsGroup :title="$t('GEN_PARAMS_INSTRUMENT')">
          <template #content>
            <ListDropdown
              :options="instrOptions"
              :defaultSelectedValue="generalParams.instrument"
              closeOnInteraction
              @@optionSelected="generalParams.instrument = $event.value"
            />
          </template>
        </SettingsGroup>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "@/components/molecules/Dropdown.vue";
import SettingsGroup from "@/components/SettingsGroup.vue";
import RadioInput from "@/components/molecules/RadioInput.vue";
import ListDropdown from "./ListDropdown.vue";
import type { IOption } from "@/types/MusicalDataTypes";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const route = useRoute();

const paramsStore = useParamsStore();
const { generalParams } = storeToRefs(paramsStore);

const instrOptions = ref<IOption[]>([
  { value: "low", displayValue: "Low / mezzo whistle" },
  { value: "tin", displayValue: "Tin whistle" }
]);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.icon-settings {
  font-size: 1.25rem;
}
.settings-container {
  padding: 20px 20px 30px 30px;
  width: 330px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.radio-group {
  display: flex;
  gap: 30px;
}
</style>