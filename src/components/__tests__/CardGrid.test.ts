import { test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CardGrid from "@/components/CardGrid.vue";
import { useParamsStore } from "@/stores/params";
import { createPinia } from "pinia";
import type { ComponentPublicInstance } from "vue"
import type { ICard } from "@/types/MusicalDataTypes";

interface CustomCpnInstance extends ComponentPublicInstance {
  currentPage?: number
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
    soundUrl: "7_f#_gb_1.mp3"
  },
];

test("renders grid and pagination correctly", () => {
  const pinia = createPinia();
  useParamsStore(pinia);

  const wrapper = shallowMount(CardGrid, {
    global: {
      plugins: [pinia],
    },
    props: {
      cards,
      pagination: true,
    },
  });

  expect(wrapper.find(".grid").exists()).toBe(true);
  expect(wrapper.find(".pagination").exists()).toBe(true);
});

test("pagination controls work correctly", async () => {
  const pinia = createPinia();
  const paramsStore = useParamsStore(pinia);

  const wrapper = shallowMount(CardGrid, {
    global: {
      plugins: [pinia],
    },
    props: {
      cards,
      pagination: true,
    },
  });
  const vm = wrapper.vm as CustomCpnInstance;

  paramsStore.fingTableParams.cardsPerPage = 1;

  const prevButton = wrapper.find(".pagination-prev");
  const nextButton = wrapper.find(".pagination-next");

  await nextButton.trigger("click");
  expect(vm.currentPage).toBe(2);

  await prevButton.trigger("click");
  expect(vm.currentPage).toBe(1);

  await prevButton.trigger("click");
  expect(vm.currentPage).toBe(3);
});
