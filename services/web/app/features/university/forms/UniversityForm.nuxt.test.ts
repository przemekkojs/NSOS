import { describe, beforeEach, it, expect } from "vitest";
import CreateUniversityForm from "./UniversityForm.vue";
import { testForm } from "../../../../test/utils/form";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";

describe("CreateUniversityForm", () => {
  let wrapper: VueWrapper<unknown>;
  let form: ReturnType<typeof testForm>;

  beforeEach(() => {
    wrapper = mount(CreateUniversityForm);
    form = testForm(wrapper);
  });

  const fields = [
    {
      inputId: "name",
    },
    {
      inputId: "code",
    },
    {
      inputId: "address",
    },
  ];

  it("renders all form fields and initialized with empty values", () => {
    form.rendersAndEmpties(fields);
  });

  it("emits 'cancel' event when cancel button is clicked", async () => {
    const cancelButton = wrapper
      .findAll("button")
      .find((b) => b.text() === "button.cancel");

    await cancelButton?.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("cancel");
    expect(wrapper.emitted().cancel).toHaveLength(1);
  });

  it("emits 'success' event with form data on submit", async () => {
    const formData = {
      name: "Test University",
      code: "TEST",
      address: "123 Test St",
    };

    await wrapper.find("#name").setValue(formData.name);
    await wrapper.find("#code").setValue(formData.code);
    await wrapper.find("#address").setValue(formData.address);

    await wrapper.find("form").trigger("submit");
    await flushPromises();

    // const emitted = wrapper.emitted("success");
    // TODO: extend checks
  });
});
