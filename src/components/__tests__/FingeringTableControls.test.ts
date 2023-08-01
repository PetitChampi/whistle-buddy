import { describe, test, expect, vi } from "vitest";
import { mount, config } from "@vue/test-utils";
import { useParamsStore } from "@/stores/params";
import { createPinia } from "pinia";
import { useI18n } from "vue-i18n";
import FingeringTableControls from "@/components/FingeringTableControls.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import SettingsGroup from "@/components/SettingsGroup.vue";
import SwitchInput from "@/components/molecules/SwitchInput.vue";
import TextSwitch from "@/components/molecules/TextSwitch.vue";
import IconButton from "@/components/molecules/IconButton.vue";
import type { ICard } from "@/types/MusicalDataTypes";

vi.mock("vue-i18n");

// @ts-expect-error mockReturnValue does not exist on the original function but is created on the mock
useI18n.mockReturnValue({
  t: (tKey: string) => tKey,
});
config.global.mocks = {
  $t: (tKey: string) => tKey
};

const cards: ICard[] = [
  {
    id: 1,
    name: { en: "d", fr: "ré" },
    fingerings: [{
      id: 1, posInScale: 1,  holes: [ 2, 2, 2, 2, 2, 2 ], type: "standard", octaves: [ 1 ]
    }],
    octave: 1,
    soundUrl: "3_d_1.mp3"
  },
  {
    id: 2,
    name: { en: "d", fr: "ré" },
    fingerings: [{
      id: 3, posInScale: 3,  holes: [ 2, 2, 2, 0, 0, 0 ], type: "standard", octaves: [ 1 ]
    }],
    octave: 2,
    soundUrl: "5_e_1.mp3"
  },
  {
    id: 3,
    name: { en: "d", fr: "ré" },
    fingerings: [{
      id: 5, posInScale: 5,  holes: [ 2, 2, 2, 2, 0, 0 ], type: "specific", octaves: [ 1 ]
    }],
    octave: 1,
    soundUrl: "7_fs_gb_1.mp3"
  },
];

describe("FingeringTableControls.vue", () => {
  const pinia = createPinia();
  const paramsStore = useParamsStore(pinia);

  const wrapper = mount(FingeringTableControls, {
    global: { plugins: [pinia] }
  });

  test("renders the controls container with the correct number of items", () => {
    const controlsContainer = wrapper.find(".controls");
    
    expect(controlsContainer.exists()).toBeTruthy();
    expect(controlsContainer.findAll(".controls-item").length).toBe(3);
  });

  test("passes the correct # of options and defaultSelectedValue to ListDropdown", () => {
    const listDropdown = wrapper.findComponent(ListDropdown);
    paramsStore.fingTableParams.cardsPerPage = 12;

    expect(listDropdown.props("options").length).toBe(13);
    expect(listDropdown.props("defaultSelectedValue")).toBe("12");
  });

  test("renders the correct # of SettingsGroup components and displays settings-container", () => {
    const dropdown = wrapper.find(".settings-container");
    const settingsGroups = dropdown.findAllComponents(SettingsGroup);

    expect(settingsGroups.length).toBe(3);
  });

  test("updates fingTableParams.flashcardMode when SwitchInput is toggled", async () => {
    const switchInput = wrapper.findComponent(SwitchInput);
    paramsStore.fingTableParams.flashcardMode = false;

    await switchInput.trigger("click");
    expect(paramsStore.fingTableParams.flashcardMode).toBe(true);
  });

  test("displays TextSwitch when fingTableParams.flashcardMode is true and passes correct # of options", () => {
    const textSwitch = wrapper.findComponent(TextSwitch);
    paramsStore.fingTableParams.flashcardMode = true;

    expect(textSwitch.exists()).toBeTruthy();
    expect(textSwitch.props("options").length).toBe(2);
  });

  test("renders IconButton with correct icon and toggles fingTableParams.shuffle when clicked", async () => {
    const iconButton = wrapper.findComponent(IconButton);
    paramsStore.fingTableParams.shuffle = false;

    expect(iconButton.props("icon")).toBe("shuffle");

    await iconButton.trigger("click");
    expect(paramsStore.fingTableParams.shuffle).toBe(true);
  });
});