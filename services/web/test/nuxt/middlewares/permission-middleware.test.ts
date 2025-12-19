import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect, beforeEach } from "vitest";
import permissionMiddleware from "../../../app/middleware/2.permission.global";

const { useUserStoreMock, abortNavigation, useToastMock } = vi.hoisted(() => ({
  useUserStoreMock: vi.fn(),
  abortNavigation: vi.fn(),
  useToastMock: vi.fn(),
}));

mockNuxtImport("useUserStore", () => useUserStoreMock);
mockNuxtImport("abortNavigation", () => abortNavigation);
mockNuxtImport("useToast", () => useToastMock);

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $i18n: {
      locale: { value: "en" },
      t: (key: string) => key,
    },
  });
});

const routeLocationFixture = {
  meta: {
    permission: "mock-permission",
  },
};

describe("PermissionMiddleware", () => {
  const mockToastAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useToastMock.mockReturnValue({ add: mockToastAdd });
  });

  it("allows navigating when user has permission", async () => {
    useUserStoreMock.mockReturnValue({
      hasPermission: () => true,
    });

    // @ts-expect-error FIXME: later
    await permissionMiddleware(routeLocationFixture, {});

    expect(abortNavigation).not.toHaveBeenCalled();
  });

  it("aborts navigation when user has no permission", async () => {
    useUserStoreMock.mockReturnValue({
      hasPermission: () => false,
    });

    // @ts-expect-error FIXME: later
    await permissionMiddleware(routeLocationFixture, {});

    expect(abortNavigation).toHaveBeenCalledWith({
      message: "page.error.permission",
    });
    expect(mockToastAdd).toHaveBeenCalledWith({
      title: "page.error.permission",
      color: "error",
      icon: "i-lucide-error",
    });
  });
});
