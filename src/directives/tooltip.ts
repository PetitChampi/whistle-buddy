import type { Directive, DirectiveBinding } from "vue";

interface ITooltip {
  text: string,
  direction?: "top" | "bottom"
}

export function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function createTooltipElement(
  document: Document, tooltipText: string, tooltipDirection: "top" | "bottom"
): HTMLElement {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip", tooltipDirection);
  tooltip.innerHTML = tooltipText;
  return tooltip;
}

export function updateTooltipElement(
  tooltip: HTMLElement, tooltipText: string, tooltipDirection: "top" | "bottom"
) {
  tooltip.innerHTML = tooltipText;
  tooltip.classList.remove("top", "bottom");
  tooltip.classList.add(tooltipDirection);
  tooltip.setAttribute("key", tooltipText);
}

const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ITooltip>) {
    const tooltipText = binding.value.text;
    const tooltipDirection = binding.value.direction || "top";
    const tooltipElement = createTooltipElement(document, tooltipText, tooltipDirection);

    el.style.position = "relative";
    el.appendChild(tooltipElement);

    const touchDevice = isTouchDevice();

    el.addEventListener("mouseenter", () => {
      if (!touchDevice) tooltipElement.classList.add("show");
    });
    el.addEventListener("mouseleave", () => {
      if (!touchDevice) tooltipElement.classList.remove("show");
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding<ITooltip>) {
    const tooltipText = binding.value.text;
    const tooltipDirection = binding.value.direction || "top";
    const tooltipElement = el.querySelector(".tooltip") as HTMLElement;

    updateTooltipElement(tooltipElement, tooltipText, tooltipDirection);
  }
};

export default tooltip;