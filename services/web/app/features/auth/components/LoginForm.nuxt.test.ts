import { beforeEach, describe, it, expect } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import LoginForm from "./LoginForm.vue";

describe.skip("LoginForm", () => {
  let wrapper: VueWrapper<unknown>;

  beforeEach(() => {
    wrapper = mount(LoginForm);
  });

  it("renders all form fields", async () => {
    expect(wrapper.find('input[type="email"]#email').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]#password').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("initializes with empty fields", async () => {
    const emailInput = wrapper.find<HTMLInputElement>("#email");
    const passwordInput = wrapper.find<HTMLInputElement>("#password");

    expect(emailInput.element.value).toBe("");
    expect(passwordInput.element.value).toBe("");
  });

  it("emits success event with valid credentials", async () => {
    await wrapper.find("#email").setValue("test@mail.com");
    await wrapper.find("#password").setValue("password123");

    await wrapper.find("form").trigger("submit");
    await flushPromises();

    const emitted = wrapper.emitted("success");

    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([
      {
        email: "test@mail.com",
        password: "password123",
      },
    ]);
  });

  it("validates email format", async () => {
    await wrapper.find("#email").setValue("invalid-email");
    await wrapper.find("#password").setValue("password123");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("success")).toBeFalsy();
    expect(wrapper.text()).toContain("form.label.emailInvalid");
  });

  it("does not submit with empty email", async () => {
    await wrapper.find("#email").setValue("");
    await wrapper.find("#password").setValue("password123");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("success")).toBeFalsy();
  });

  it("does not submit with empty password", async () => {
    await wrapper.find("#email").setValue("test@mail.com");
    await wrapper.find("#password").setValue("");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("success")).toBeFalsy();
  });

  it("prevents default form submission", async () => {
    const form = wrapper.find("form");
    const submitEvent = new Event("submit", { cancelable: true });

    form.element.dispatchEvent(submitEvent);

    // Form should have @submit.prevent, so default should be prevented
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
