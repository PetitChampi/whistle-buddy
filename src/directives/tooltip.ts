import type { DirectiveBinding, Directive } from "vue";

const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltipText: string = binding.value;
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerHTML = tooltipText;
    el.style.position = "relative";
    el.appendChild(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.classList.add("show");
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const tooltipText: string = binding.value;
    const tooltip = el.querySelector(".tooltip") as HTMLElement;
    tooltip.innerHTML = tooltipText;
    tooltip.setAttribute('key', tooltipText);
  }
}

export default tooltip;