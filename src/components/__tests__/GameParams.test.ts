import { describe, test, expect } from "vitest";
import { shallowMount, config, VueWrapper } from "@vue/test-utils";
import { useParamsStore } from "@/stores/params";
import { createTestingPinia } from "@pinia/testing";
import GameParams from "@/components/GameParams.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import imgpreload from "@/directives/imgpreload";
import type { ComponentPublicInstance, Ref } from "vue";
import type { IGuessGameParams, IMixMatchParams } from "@/types/ParamTypes";

interface CustomCpnInstance extends ComponentPublicInstance {
  selectedFingStrings: string[],
  currentGameParams: Ref<IGuessGameParams | IMixMatchParams>
}

config.global.mocks = {
  $t: (tKey: string) => tKey
};

describe("GameSettings.vue", () => {
  const pinia = createTestingPinia();
  const paramsStore = useParamsStore(pinia);

  const wrapper: VueWrapper = shallowMount(GameParams, {
    props: { gameType: "guessing" },
    global: {
      plugins: [pinia],
      directives: { imgpreload }
    }
  });

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
  const vm = wrapper.vm as CustomCpnInstance;
  await wrapper.setProps({ gameType: "guessing" });
    expect(vm.currentGameParams.value).toEqual(paramsStore.guessGameParams);

    await wrapper.setProps({ gameType: "mixmatch" });
    expect(vm.currentGameParams.value).toEqual(paramsStore.mixMatchParams);
  });
});
