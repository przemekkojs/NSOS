import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import authMiddleware from "../../app/middleware/1.auth";

const { navigateToMock, useUserStoreMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
  useUserStoreMock: vi.fn(),
}));

mockNuxtImport("useUserStore", () => useUserStoreMock);
mockNuxtImport("navigateTo", () => navigateToMock);

describe("AuthMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // vi.resetModules();
  });

  it("redirects unauthenticated users to home", async () => {
    useUserStoreMock.mockResolvedValue({ isAuthenticated: false });

    await authMiddleware({}, {});
    expect(navigateToMock).toHaveBeenCalledWith("/");
  });

  it("allows authenticated users", async () => {
    useUserStoreMock.mockResolvedValue({ isAuthenticated: true });

    await authMiddleware({}, {});
    expect(navigateToMock).not.toHaveBeenCalled();
  });
});
