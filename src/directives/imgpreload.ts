import type { DirectiveBinding, Directive } from "vue";

const imgpreload: Directive = {
  created(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    const image = new Image();
    image.src = binding.value;
  },
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    el.src = binding.value;
  }
}

export default imgpreload;