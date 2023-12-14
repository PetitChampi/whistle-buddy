<template>
  <div class="game-settings">
    <h1 class="page-title">
      {{ gameType === 'guessing' ? $t("GEN_GUESSING_GAME") : $t("GEN_MIX_OR_MATCH") }}
    </h1>
    <div class="mascot-tip">
      <img v-imgpreload="`${baseUrl}img/flann-greet.png`" alt="Greeting mascot">
      <div class="mascot-tip-bubble">
        {{ gameType === 'guessing' ? $t('G_GUESS_INTRO') : $t('G_MIXM_INTRO') }}
      </div>
    </div>

    <h2 class="game-settings-title">{{ $t("G_PARAMS_HEADING") }}</h2>
    <div class="settings-items">
      <SettingsGroup :title="$t('G_PARAMS_TITLE_KEY')" large>
        <template #content>
          <KeySelector />
        </template>
      </SettingsGroup>

      <SettingsGroup v-if="gameType === 'guessing'" :title="$t('G_PARAMS_TITLE_VTG')" large>
        <template #content>
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
        <template #content>
          <div class="settings-item-content">
            <GaugeInput
              v-model="guessGameParams.nbChoices.current"
              :min="guessGameParams.nbChoices.min"
              :max="guessGameParams.nbChoices.max"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup v-if="gameType === 'mixmatch'" :title="$t('G_PARAMS_TITLE_NB_PAIRS')" large>
        <template #content>
          <div class="settings-item-content">
            <GaugeInput
              v-model="mixMatchParams.nbOfPairs.current"
              :min="mixMatchParams.nbOfPairs.min"
              :max="mixMatchParams.nbOfPairs.max"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup
        v-if="gameType === 'mixmatch'"
        :title="$t('G_PARAMS_TITLE_TIMER')"
        hasCheckbox
        large
        :checkboxModelValue="currentGameParams.value.timer"
        @@updateCheckbox="currentGameParams.value.timer = $event"
      >
        <template #content>
          <div class="settings-item-content">
            <GaugeInput
              v-model="currentGameParams.value.timerValues.current"
              :min="currentGameParams.value.timerValues.min"
              :max="currentGameParams.value.timerValues.max"
              :unit="currentGameParams.value.timerValues.unit"
              :disabled="!currentGameParams.value.timer"
            />
          </div>
        </template>
      </SettingsGroup>

      <SettingsGroup
        :title="$t('GEN_SELECTED_FINGS')"
        large
        accordion
        :badgeText="generalParams.selectedFingerings.length.toString()"
      >
        <template #content>
          <div class="settings-item-content">
            <p class="checkbox-grid-label">{{ $t('GEN_STANDARD') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput
                v-for="fing in fingsPerType.standard"
                :key="fing.id"
                v-model="selectedFingStrings"
                :value="`${getCheckboxData(fing).value}`"
                :label="getCheckboxData(fing).displayValue"
              />
            </div>
            <p class="checkbox-grid-label">{{ $t('GEN_HALFHOLE') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput
                v-for="fing in fingsPerType.halfhole"
                :key="fing.id"
                v-model="selectedFingStrings"
                :value="`${getCheckboxData(fing).value}`"
                :label="getCheckboxData(fing).displayValue"
              />
            </div>
            <p class="checkbox-grid-label">{{ $t('GEN_SPECIFIC') }}</p>
            <div class="checkbox-grid">
              <CheckboxInput
                v-for="fing in fingsPerType.specific"
                :key="fing.id"
                v-model="selectedFingStrings"
                :value="`${getCheckboxData(fing).value}`"
                :label="getCheckboxData(fing).displayValue"
              />
            </div>
          </div>
        </template>
      </SettingsGroup>
    </div>

    <div class="divider">
      <!-- NOTE: Using v-html is safe here since its value isn't user-modifiable -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="divider-text" v-html="$t('GEN_PARAMS_GENERAL')" />
      <div class="divider-line" />
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
import KeySelector from "./molecules/KeySelector.vue";
import RadioInput from "@/components/molecules/RadioInput.vue";
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import GaugeInput from "@/components/molecules/GaugeInput.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";
import type { IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";
import type { IFingering } from "@/types/MusicalDataTypes";
import { useParamsStore } from "@/stores/params";
import { useMusicalDataStore } from "@/stores/musicalData";
import { storeToRefs } from "pinia";
import getCheckboxData from "@/composables/getCheckboxData";

const props = defineProps<{
  gameType: string
}>();

const baseUrl = import.meta.env.BASE_URL;

const paramsStore = useParamsStore();
const musicalDataStore = useMusicalDataStore();
const { generalParams, guessGameParams, mixMatchParams } = storeToRefs(paramsStore);
const { fingsPerType, fingerings } = storeToRefs(musicalDataStore);

const emit = defineEmits(["@gameStarted"]);

const selectedFingStrings = ref<string[]>(
  generalParams.value.selectedFingerings.map(fing => fing.id.toString())
);

const currentGameParams = computed<Ref<IGuessGameParams> | Ref<IMixMatchParams>>(() => {
  let currGameParams: Ref<IGuessGameParams> | Ref<IMixMatchParams> = guessGameParams;
  switch (props.gameType) {
    case "guessing":
      currGameParams = guessGameParams;
      break;
    case "mixmatch":
      currGameParams = mixMatchParams;
      break;
    default:
  }

  return currGameParams;
});

function startGame() {
  emit("@gameStarted");
}

watch(() => selectedFingStrings.value, (newFings) => {
  generalParams.value.selectedFingerings = [];
  newFings.forEach(fingId => {
    generalParams.value.selectedFingerings.push(
      fingerings.value.find(fing => fing.id === Number(fingId)) as IFingering
    );
  });
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.game-settings {
  max-width: 660px;
  margin: 50px auto 0;
  @media screen and (max-width: $mobile) {
    margin-top: 30px;
  }

  &-title {
    font-size: 2.25rem;
    border-bottom: 2px solid var(--text-standard-half-transparent);
    margin: 50px 0 30px;
  }
  .mascot-tip {
    display: flex;
    gap: 25px;
    margin-top: 50px;

    img {
      width: 60px;
      object-fit: contain;
      object-position: top;
    }
    &-bubble {
      background-color: var(--faint);
      border-radius: 10px;
      padding: 10px 20px 12px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        border-width: 7px 15px;
        border-style: solid;
        right: 100%;
        top: 20px;
        border-color: transparent var(--faint) transparent transparent;
      }
    }
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
    align-items: baseline;
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