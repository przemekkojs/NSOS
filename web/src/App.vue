<template>
  <ConfigProvider>
    <Suspense>
      <UApp>
        <RouterView />
      </UApp>
    </Suspense>
  </ConfigProvider>
</template>
