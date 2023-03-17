import type { DirectiveBinding, Directive } from "vue";

interface ITooltip {
  text: string,
  direction?: "top" | "bottom"
}
const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ITooltip>) {
    const tooltipText: string = binding.value.text;
    const tooltipDirection: "top" | "bottom" = binding.value.direction || "top";
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", tooltipDirection);
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
  updated(el: HTMLElement, binding: DirectiveBinding<ITooltip>) {
    const tooltipText: string = binding.value.text;
    const tooltipDirection: "top" | "bottom" = binding.value.direction || "top";
    const tooltip = el.querySelector(".tooltip") as HTMLElement;
    tooltip.innerHTML = tooltipText;
    tooltip.classList.remove("top", "bottom");
    tooltip.classList.add(tooltipDirection);
    tooltip.setAttribute('key', tooltipText);
  }
}

export default tooltip;