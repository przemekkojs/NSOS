import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import permissionMiddleware from "../../app/middleware/2.permission.global";

const { useUserStoreMock, abortNavigation } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
  useUserStoreMock: vi.fn(),
  abortNavigation: vi.fn(),
}));

mockNuxtImport("useUserStore", () => useUserStoreMock);
mockNuxtImport("abortNavigation", () => abortNavigation);
// mockNuxtImport("navigateTo", () => navigateToMock);

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $i18n: {
      locale: { value: "en" },
      t: (key: string) => key,
    },
  });
});

describe("PermissionMiddleware", () => {
  it("allows navigating when user has permission", async () => {
    useUserStoreMock.mockReturnValue({
      hasPermission: () => true,
    });
    await permissionMiddleware(
      {
        meta: {
          permission: "mock-permission",
        },
      },
      {}
    );

    // expect(navigateToMock).not.toHaveBeenCalled();
    expect(abortNavigation).not.toHaveBeenCalled();
  });

  it("aborts navigation when user has no permission", async () => {
    useUserStoreMock.mockReturnValue({
      hasPermission: () => false,
    });

    await permissionMiddleware({
      meta: {
        permission: "mock-permission",
      },
    });

    expect(abortNavigation).toHaveBeenCalledWith({
      message: "page.error.permission",
    });
  });
});
