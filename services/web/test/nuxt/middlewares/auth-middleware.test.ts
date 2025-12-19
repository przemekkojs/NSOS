import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import authMiddleware from "../../../app/middleware/1.auth.global";

const { navigateToMock, useUserStoreMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
  useUserStoreMock: vi.fn(),
}));

mockNuxtImport("useUserStore", () => useUserStoreMock);
mockNuxtImport("navigateTo", () => navigateToMock);

describe.skip("AuthMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to home", async () => {
    useUserStoreMock.mockReturnValueOnce({ isAuthenticated: false });

    // @ts-expect-error FIXME: later
    await authMiddleware({}, {});
    expect(navigateToMock).toHaveBeenCalledWith("/login");
  });

  it("allows authenticated users", async () => {
    useUserStoreMock.mockReturnValueOnce({ isAuthenticated: true });

    // @ts-expect-error FIXME: later
    await authMiddleware({}, {});
    expect(navigateToMock).not.toHaveBeenCalled();
  });
});
