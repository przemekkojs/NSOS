import { describe, it, expect } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import RegisterForm from "./RegisterForm.vue";

describe.skip("RegisterForm", () => {
  it("renders all form fields", async () => {
    const wrapper = mount(RegisterForm);

    expect(wrapper.find('input[type="email"]#email').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]#password').exists()).toBe(true);
    expect(
      wrapper.find('input[type="password"]#confirm-password').exists()
    ).toBe(true);
  });

  it("initializes with empty fields", async () => {
    const wrapper = mount(RegisterForm);

    const emailInput = wrapper.find<HTMLInputElement>("#email");
    const passwordInput = wrapper.find<HTMLInputElement>("#password");
    const confirmPasswordInput =
      wrapper.find<HTMLInputElement>("#confirm-password");

    expect(emailInput.element.value).toBe("");
    expect(passwordInput.element.value).toBe("");
    expect(confirmPasswordInput.element.value).toBe("");
  });

  it("emits success event with valid credentials", async () => {
    const wrapper = mount(RegisterForm);

    await wrapper.find("#email").setValue("test@mail.com");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("#confirm-password").setValue("password123");
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    const emitted = wrapper.emitted("success");

    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([
      {
        email: "test@mail.com",
        password: "password123",
        confirmPassword: "password123",
      },
    ]);
  });

  it("validates email format", async () => {
    const wrapper = mount(RegisterForm);

    await wrapper.find("#email").setValue("invalid-email");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("success")).toBeFalsy();
    expect(wrapper.text()).toContain("form.label.emailInvalid");
  });

  it("does not submit with empty email", async () => {
    const wrapper = mount(RegisterForm);

    await wrapper.find("#email").setValue("");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(wrapper.emitted("success")).toBeFalsy();
  });

  it("does not submit with empty password", async () => {
    const wrapper = mount(RegisterForm);

    await wrapper.find("#email").setValue("test@mail.com");
    await wrapper.find("#password").setValue("");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(wrapper.emitted("success")).toBeFalsy();
  });
});
