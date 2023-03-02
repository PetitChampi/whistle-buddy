<template>
  <Dropdown>
    <template v-slot:dropdown-title>
      <span class="icon-settings"></span>
    </template>
    <template v-slot:dropdown-content>
      <div class="settings-container">
        <SettingsGroup
          :title="$t('GEN_PARAMS_FR_NOTATION')"
          subtitle="Do, Ré, Mi..."
          hasCheckbox
        />

        <SettingsGroup
          v-if="route.name !== 'guessingGame' && route.name !== 'mixOrMatch'"
          :title="$t('GEN_PARAMS_SHOW_OCTAVE')"
        >
          <template v-slot:content>
            <div class="radio-group">
              <RadioInput v-model="showOctave" groupName="octave" value="lower" label="1" small />
              <RadioInput v-model="showOctave" groupName="octave" value="higher" label="2" small />
              <RadioInput v-model="showOctave" groupName="octave" value="both" label="1 + 2" small />
            </div>
          </template>
        </SettingsGroup>

        <SettingsGroup
          v-if="route.name !== 'guessingGame' && route.name !== 'mixOrMatch'"
          :title="$t('GEN_PARAMS_GROUP_HOMOPHONES')"
          :subtitle="$t('GEN_PARAMS_SUBTITLE_HOMO')"
          hasCheckbox
        />

        <SettingsGroup
          :title="$t('GEN_PARAMS_SYNESTHESIA')"
          :subtitle="$t('GEN_PARAMS_SUBTITLE_SYN')"
          hasCheckbox
          accordion
        >
          <template v-slot:content>
            Insert colour pickers here
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
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();

const showOctave = ref<string>("");
</script>

<style lang="scss" scoped>
.icon-settings {
  font-size: 1.25rem;
}
.settings-container {
  padding: 20px 20px 30px 30px;
  width: 350px;
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