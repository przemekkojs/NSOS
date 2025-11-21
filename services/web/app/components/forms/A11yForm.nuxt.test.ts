import { beforeEach, describe, it, expect } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import A11yForm from "./A11yForm.vue";

describe("A11yForm", () => {
  let wrapper: VueWrapper<unknown>;

  beforeEach(() => {
    wrapper = mount(A11yForm);
  });

  it("renders all from fields", () => {
    expect(wrapper.find("#font-scale").exists()).toBe(true);
    expect(wrapper.find("#line-height").exists()).toBe(true);
    expect(wrapper.find("#tooltip-duration").exists()).toBe(true);
    expect(wrapper.find("#colorblind-mode").exists()).toBe(true);
    expect(wrapper.find("#reduce-motion").exists()).toBe(true);
    expect(wrapper.find("#disable-animation").exists()).toBe(true);
    expect(wrapper.find("#announcements").exists()).toBe(true);
  });
});
