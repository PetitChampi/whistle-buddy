import type { DirectiveBinding, Directive } from "vue";

type ImgpreloadDirective = Directive<HTMLImageElement, string> & {
  created: (el: HTMLImageElement, binding: DirectiveBinding<string>) => void;
  beforeMount: (el: HTMLImageElement, binding: DirectiveBinding<string>) => void;
  updated: (el: HTMLImageElement, binding: DirectiveBinding<string>) => void;
};

const imgpreload: ImgpreloadDirective = {
  created(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    const image = new Image();
    image.src = binding.value;
  },
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    el.src = binding.value;
  },
  updated(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    el.src = binding.value;
  }
};

export default imgpreload;