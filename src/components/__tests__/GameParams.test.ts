import { describe, test, expect } from "vitest";
import { shallowMount, config, VueWrapper } from "@vue/test-utils";
import { useParamsStore } from "@/stores/params";
import { createPinia } from "pinia";
import GameParams from "@/components/GameParams.vue";
import CustomButton from "../molecules/CustomButton.vue";
import type { ComponentPublicInstance } from "vue";
import type { IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";

interface CustomCpnInstance extends ComponentPublicInstance {
  selectedFingStrings: string[],
  currentGameParams: IGuessGameParams | IMixMatchParams
}

config.global.mocks = {
  $t: (tKey: string) => tKey
};

describe("GameSettings.vue", () => {
  const pinia = createPinia();
  const paramsStore = useParamsStore(pinia);

  const wrapper: VueWrapper<any> = shallowMount(GameParams, {
    props: { gameType: "guessing" },
    global: { plugins: [pinia] }
  });
  const vm = wrapper.vm as CustomCpnInstance;

  test("renders the component", () => {
    const controlsContainer = wrapper.find(".game-settings");
    expect(controlsContainer.exists()).toBeTruthy();
  });

  test("displays correct settings based on gameType prop", async () => {
    expect(wrapper.get(".settings-items").html()).toContain("G_PARAMS_TITLE_VTG");
    expect(wrapper.get(".settings-items").html()).not.toContain("G_PARAMS_TITLE_NB_PAIRS");

    await wrapper.setProps({ gameType: "mixmatch" });
    expect(wrapper.get(".settings-items").html()).not.toContain("G_PARAMS_TITLE_VTG");
    expect(wrapper.get(".settings-items").html()).toContain("G_PARAMS_TITLE_NB_PAIRS");
  });

  test("Start Game button emits @gameStarted event", async () => {
    const startGameButton = wrapper.getComponent(CustomButton);
    await startGameButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("@gameStarted");
  });

  test("currentGameParams updates based on gameType prop", async () => {
    await wrapper.setProps({ gameType: "guessing" });
    expect(wrapper.vm.currentGameParams.value).toEqual(paramsStore.guessGameParams);

    await wrapper.setProps({ gameType: "mixmatch" });
    expect(wrapper.vm.currentGameParams.value).toEqual(paramsStore.mixMatchParams);
  });
});
