export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  // Check if we're in development and MSW is enabled
  if (!import.meta.dev || !config.public.mswEnabled) {
    return;
  }

  try {
    const { worker } = await import("../mocks/browser");

    await worker.start({
      onUnhandledRequest(request, print) {
        const url = new URL(request.url);

        if (
          !url.hostname.includes(
            config.public.apiUrl.replace(/^https?:\/\//, "")
          )
        ) {
          return;
        }

        print.warning();
      },
    });

    console.log("🔶 MSW enabled");
  } catch (error) {
    console.error("Failed to start MSW:", error);
  }
});
