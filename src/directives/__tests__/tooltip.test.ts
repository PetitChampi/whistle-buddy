import { test, expect, describe, beforeEach } from "vitest";
import { isTouchDevice, createTooltipElement, updateTooltipElement } from "@/directives/tooltip";
import { JSDOM } from "jsdom";

describe("Directive: tooltip", () => {
  let document: Document;

  beforeEach(() => {
    const dom = new JSDOM("", { url: "http://localhost/" });
    document = dom.window.document;
  });

  test("isTouchDevice", () => {
    expect(typeof isTouchDevice()).toBe("boolean");
  });

  test("createTooltipElement", () => {
    const tooltipElement = createTooltipElement(document, "Test tooltip", "top");

    expect(tooltipElement.nodeName).toBe("DIV");
    expect(tooltipElement.classList.contains("tooltip")).toBe(true);
    expect(tooltipElement.classList.contains("top")).toBe(true);
    expect(tooltipElement.innerHTML).toBe("Test tooltip");
  });

  test("updateTooltipElement", () => {
    const tooltipElement = document.createElement("div");
    tooltipElement.classList.add("tooltip", "top");
    tooltipElement.innerHTML = "Initial tooltip";

    updateTooltipElement(tooltipElement, "Updated tooltip", "bottom");

    expect(tooltipElement.classList.contains("top")).toBe(false);
    expect(tooltipElement.classList.contains("bottom")).toBe(true);
    expect(tooltipElement.innerHTML).toBe("Updated tooltip");
    expect(tooltipElement.getAttribute("key")).toBe("Updated tooltip");
  });
});
