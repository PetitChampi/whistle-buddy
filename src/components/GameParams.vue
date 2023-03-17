<template>
  <div class="game-settings">
    <h1 class="page-title">{{ $t("G_PARAMS_HEADING") }}</h1>
    <div class="settings-items">
      <SettingsGroup :title="$t('G_PARAMS_TITLE_KEY')" large>
        <template v-slot:content>
          <ListDropdown
            :options="keyOptions"
            :defaultSelectedOption="'d'"
            :closeOnInteraction="true"
          />
        </template>
      </SettingsGroup>

      <SettingsGroup v-if="gameType === 'guessing'" :title="$t('G_PARAMS_TITLE_VTG')" large>
        <template v-slot:content>
          <div class="radio-group">
            <RadioInput
              v-model="guessGameParams.valuesToGuess"
              groupName="guessValue"
              value="note"
              :label="$t('G_PARAMS_VTG_NOTE')"
            />
            <RadioInput
              v-model="guessGameParams.valuesToGuess"
              groupName="guessValue"
              value="fing"
              :label="$t('G_PARAMS_VTG_FING')"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup v-if="gameType === 'guessing'" :title="$t('G_PARAMS_TITLE_NB_CHOICES')" large>
        <template v-slot:content>
          <div class="settings-item-content">
            <GaugeInput
              :min="guessGameParams.nbChoices.min"
              :max="guessGameParams.nbChoices.max"
              v-model="guessGameParams.nbChoices.current"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup v-if="gameType === 'mixmatch'" :title="$t('G_PARAMS_TITLE_NB_PAIRS')" large>
        <template v-slot:content>
          <div class="settings-item-content">
            <GaugeInput
              :min="mixMatchParams.nbOfPairs.min"
              :max="mixMatchParams.nbOfPairs.max"
              v-model="mixMatchParams.nbOfPairs.current"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup
        :title="$t('G_PARAMS_TITLE_TIMER')"
        hasCheckbox
        large
        :checkboxModelValue="currentGameParams.value.timer"
        @@updateCheckbox="currentGameParams.value.timer = $event"
      >
        <template v-slot:content>
          <div class="settings-item-content">
            <GaugeInput
              :min="currentGameParams.value.timerValues.min"
              :max="currentGameParams.value.timerValues.max"
              :unit="currentGameParams.value.timerValues.unit"
              v-model="currentGameParams.value.timerValues.current"
              :disabled="!currentGameParams.value.timer"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup
        :title="$t('GEN_SELECTED_FINGS')"
        :subtitle="gameType === 'mixmatch' ? $t('G_MIXM_FINGS_SUBTITLE') : ''"
        large
        accordion
      >
        <template v-slot:content>
          <div class="settings-item-content">
            <p class="checkbox-grid-label">{{ $t('GEN_STANDARD') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput v-model="selectedFingerings" value="a" label="A" />
              <CheckboxInput v-model="selectedFingerings" value="b" label="B" />
              <CheckboxInput v-model="selectedFingerings" value="c" label="C" />
              <CheckboxInput v-model="selectedFingerings" value="d" label="D" />
              <CheckboxInput v-model="selectedFingerings" value="e" label="E" />
              <CheckboxInput v-model="selectedFingerings" value="f" label="F" />
              <CheckboxInput v-model="selectedFingerings" value="g" label="G" />
            </div>
            <p class="checkbox-grid-label">{{ $t('GEN_HALFHOLE') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput v-model="selectedFingerings" value="a-hh" label="A" />
              <CheckboxInput v-model="selectedFingerings" value="b-hh" label="B" />
              <CheckboxInput v-model="selectedFingerings" value="c-hh" label="C" />
              <CheckboxInput v-model="selectedFingerings" value="d-hh" label="D" />
            </div>
            <p class="checkbox-grid-label">{{ $t('GEN_SPECIFIC') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput v-model="selectedFingerings" value="a-sp" label="A" />
              <CheckboxInput v-model="selectedFingerings" value="b-sp" label="B" />
              <CheckboxInput v-model="selectedFingerings" value="c-sp" label="C" />
              <CheckboxInput v-model="selectedFingerings" value="d-sp" label="D" />
              <CheckboxInput v-model="selectedFingerings" value="e-sp" label="E" />
            </div>
          </div>
        </template>
      </SettingsGroup>
    </div>

    <div class="divider">
      <span class="divider-text" v-html="$t('GEN_PARAMS_GENERAL')"></span>
      <div class="divider-line"></div>
    </div>

    <div class="settings-items">
      <SettingsGroup
        :title="$t('GEN_PARAMS_FR_NOTATION')"
        subtitle="Do, Ré, Mi..."
        hasCheckbox
        large
        :checkboxModelValue="generalParams.frNotation"
        @@updateCheckbox="generalParams.frNotation = $event"
      />
      <!-- <SettingsGroup
        :title="$t('GEN_PARAMS_SYNESTHESIA')"
        :subtitle="$t('GEN_PARAMS_SUBTITLE_SYN')"
        hasCheckbox
        large
        accordion
      >
        <template v-slot:content>
          Insert colour pickers here
        </template>
      </SettingsGroup> -->
    </div>
    <div class="btn-container">
      <CustomButton :btnText="$t('GEN_START_GAME')" @click="startGame" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsGroup from "@/components/SettingsGroup.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import RadioInput from "@/components/molecules/RadioInput.vue";
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import GaugeInput from "@/components/molecules/GaugeInput.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { IOption } from "@/types/MusicalDataTypes";
import type { IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const props = defineProps<{
  gameType: string
}>();

const paramsStore = useParamsStore();
const { generalParams, guessGameParams, mixMatchParams } = storeToRefs(paramsStore);

const emit = defineEmits(["@gameStarted"]);

const selectedFingerings = ref<string[]>([]);

const currentGameParams = computed<Ref<IGuessGameParams> | Ref<IMixMatchParams>>(() => {
  let currGameParams: Ref<IGuessGameParams> | Ref<IMixMatchParams> = guessGameParams;
  switch (props.gameType) {
    case 'guessing':
      currGameParams = guessGameParams;
      break;
    case 'mixmatch':
      currGameParams = mixMatchParams;
      break;
    default:
  }

  return currGameParams;
});

function startGame() {
  emit("@gameStarted");
}

// Todo: replace w/ state
const keyOptions = ref<IOption[]>([
  { value: "a", displayValue: "A" },
  { value: "b", displayValue: "B" },
  { value: "c", displayValue: "C" },
  { value: "d", displayValue: "D" }
]);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.game-settings {
  max-width: 660px;
  margin: 50px auto 0;
  @media screen and (max-width: $mobile) {
    margin-top: 30px;
  }

  .settings-items {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .divider {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 60px 0 40px;

    &-text {
      font-weight: 600;
      color: var(--text-standard-half-transparent);
    }
    &-line {
      height: 2px;
      width: 100%;
      background-color: var(--text-standard-half-transparent);
    }
  }

  .settings-item-content {
    max-width: 400px;
  }
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .btn-container {
    margin-top: 60px;
    text-align: center;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(4, min-content);
    gap: 15px 40px;
    margin-bottom: 20px;

    &-label {
      font-size: .875rem;
      margin-bottom: 10px;
    }
  }
}
</style>