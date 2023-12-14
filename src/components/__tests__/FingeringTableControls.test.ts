import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, config } from "@vue/test-utils";
import FingeringTableControls from "@/components/FingeringTableControls.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import SettingsGroup from "@/components/SettingsGroup.vue";
import SwitchInput from "@/components/molecules/SwitchInput.vue";
import TextSwitch from "@/components/molecules/TextSwitch.vue";
import IconButton from "@/components/molecules/IconButton.vue";
import tooltip from "@/directives/tooltip";
import { useParamsStore } from "@/stores/params";
import { createTestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";

config.global.mocks = {
  $t: (tKey: string) => tKey,
  t: (tKey: string) => tKey,
};

describe("FingeringTableControls.vue", () => {
  let wrapper: VueWrapper;

  const testPinia = createTestingPinia();
  const paramsStore = useParamsStore(testPinia);

  beforeEach(() => {
    wrapper = shallowMount(FingeringTableControls, {
      global: {
        plugins: [testPinia],
        directives: { tooltip }
      }
    });
  });

  afterEach(() => { wrapper.unmount() });

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
    expect(textSwitch.props("options")?.length).toBe(2);
  });

  test("renders IconButton with correct icon and toggles fingTableParams.shuffle when clicked", async () => {
    const iconButton = wrapper.findComponent(IconButton);
    paramsStore.fingTableParams.shuffle = false;

    expect(iconButton.props("icon")).toBe("shuffle");

    await iconButton.trigger("click");
    expect(paramsStore.fingTableParams.shuffle).toBe(true);
  });
});