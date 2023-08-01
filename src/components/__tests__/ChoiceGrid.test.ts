import { describe, test, expect } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import ChoiceGrid from "@/components/ChoiceGrid.vue";
import Card from "@/components/molecules/Card.vue";
import type { ComponentPublicInstance } from "vue";
import type { ICard } from "@/types/MusicalDataTypes";

interface CustomCpnInstance extends ComponentPublicInstance {
  selectedCard: ICard
}

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

describe("ChoiceGrid.vue", () => {
  const defaultProps = { cards };
  const wrapper: VueWrapper<any> = shallowMount(ChoiceGrid, {
    props: defaultProps,
  });
  const vm = wrapper.vm as CustomCpnInstance;

  test("renders correct number of Card components", () => {
    const cardComponents = wrapper.findAllComponents(Card);
    expect(cardComponents.length).toBe(defaultProps.cards.length);
  });

  test("assigns correct classes based on cards prop length", async () => {
    await wrapper.setProps({
      cards: defaultProps.cards,
      valuesToShow: "notes",
    });

    const grid = wrapper.get(".grid");
    expect(grid.classes()).toContain("grid-note-3");
  });

  test("emits @selectCard with correct payload when @select is emitted", async () => {
    const cardComponents = wrapper.findAllComponents(Card);
    const firstCard = cardComponents[0];
    const firstCardId = firstCard.props("note").id;

    await firstCard.vm.$emit("@select", { selected: true, card: firstCard.props("note") });

    expect(wrapper.emitted()).toHaveProperty("@selectCard");
    expect(wrapper.emitted("@selectCard")![0][0]).toHaveProperty("id", firstCardId);
  });
});
