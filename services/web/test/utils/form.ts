import { expect } from "vitest";
import type { DOMWrapper, VueWrapper } from "@vue/test-utils";

interface FieldTestOptions {
  /** input id to select the field */
  inputId: string;
  /** expected initial value (often "" or a prop value) */
  initialValue?: string;
}

export function testForm<T>(wrapper: VueWrapper<T>) {
  function findInputByLabel(text: string): DOMWrapper<HTMLInputElement> {
    const label = wrapper.find(`label[for="${text}"]`);

    const inputId = label.attributes("for");

    if (inputId) {
      return wrapper.find<HTMLInputElement>(`#${inputId}`);
    }

    return wrapper.find<HTMLInputElement>(
      `[aria-label="${text}"], [name="${text}"]`
    );
  }

  function rendersAndEmpties(fields: FieldTestOptions[]) {
    for (const field of fields) {
      const input = findInputByLabel(field.inputId.toLowerCase());

      expect(
        input.exists(),
        `Field with label "${field.inputId}" must exist.`
      ).toBe(true);

      const expectedValue = field.initialValue ?? "";
      expect(
        input.element.value,
        `Field "${field.inputId}" must initialize to "${expectedValue}"`
      ).toBe(expectedValue);
    }
  }

  return {
    rendersAndEmpties,
  };
}
