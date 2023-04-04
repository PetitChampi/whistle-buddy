import { test, expect, describe, vi } from "vitest";
import imgpreload from "@/directives/imgpreload";
import type { DirectiveBinding } from "vue";

describe("Directive: imgpreload", () => {
  const imgEl = document.createElement("img");
  const binding = {
    value: "https://example.com/image.jpg",
  } as DirectiveBinding<string>;

  test("created hook sets Image src to binding value", () => {
    const ImageSpy = vi.spyOn(window, "Image");
    imgpreload.created(imgEl, binding);
  
    expect(ImageSpy).toHaveBeenCalledTimes(1);
  });

  test("beforeMount hook sets element src to binding value", () => {    
    imgpreload.beforeMount(imgEl, binding);
    expect(imgEl.src).toBe(binding.value);
  });
});