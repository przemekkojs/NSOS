import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CSVImport from "./CSVImport.vue";

vi.mock("~/features/imports/utils", () => ({
  parseCSV: vi.fn(),
}));

const mockToastAdd = vi.fn();
vi.mock("#app", () => ({
  useToast: () => ({
    add: mockToastAdd,
  }),
}));

describe("CSVImport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the import button", async () => {
    const wrapper = mount(CSVImport);

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("feature.csv.import");
  });

  it("opens modal when button is clicked", async () => {
    const wrapper = mount(CSVImport);

    expect(wrapper.vm.open).toBe(false);

    await wrapper.find("button").trigger("click");

    expect(wrapper.vm.open).toBe(true);
  });

  it("displays download sample link in footer", async () => {
    const wrapper = mount(CSVImport, {
      glboal: {
        stubs: {
          RouterLink: true,
          NuxtLink: true,
          Teleport: true,
        },
      },
    });

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();
    const downloadLink = wrapper.find('a[href="/samples/users.example.csv"]');
    expect(downloadLink.exists()).toBe(true);
    expect(downloadLink.attributes("download")).toBeDefined();
  });

  it("emits proceed event with parsed data on successful upload", async () => {
    const mockData = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
    ];

    const { parseCSV } = await import("~/features/imports/utils");
    vi.mocked(parseCSV).mockResolvedValue(mockData);

    const wrapper = mount(CSVImport);

    const mockFile = new File(
      ["name,email\nJohn,john@example.com"],
      "test.csv",
      {
        type: "text/csv",
      }
    );

    await wrapper.vm.handleFileUpload(mockFile);
    await wrapper.vm.$nextTick();

    expect(parseCSV).toHaveBeenCalledWith(mockFile);
    expect(wrapper.emitted("proceed")).toBeTruthy();
    expect(wrapper.emitted("proceed")?.[0]).toEqual([mockData]);
  });

  it("shows success toast after CSV import", async () => {
    const mockData = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
    ];

    const { parseCSV } = await import("~/features/imports/utils");
    vi.mocked(parseCSV).mockResolvedValue(mockData);

    const wrapper = mount(CSVImport);

    const mockFile = new File(
      ["name,email\nJohn,john@example.com"],
      "test.csv",
      {
        type: "text/csv",
      }
    );

    await wrapper.vm.handleFileUpload(mockFile);

    expect(mockToastAdd).toHaveBeenCalledWith({
      title: "CSV Imported",
      description: "Successfully imported 2 rows from CSV file.",
      color: "success",
    });
  });

  it("closes modal after successful upload", async () => {
    const mockData = [{ name: "John Doe" }];

    const { parseCSV } = await import("~/features/imports/utils");
    vi.mocked(parseCSV).mockResolvedValue(mockData);

    const wrapper = mount(CSVImport);

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();

    const mockFile = new File(["name\nJohn"], "test.csv", {
      type: "text/csv",
    });

    await wrapper.vm.handleFileUpload(mockFile);

    expect(wrapper.vm.open).toBe(false);
  });

  it("accepts only CSV files", async () => {
    const wrapper = mount(CSVImport);

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();
    const fileUpload = wrapper.findComponent({ name: "UFileUpload" });
    expect(fileUpload.props("accept")).toBe(".csv");
  });
});
