<template>
  <UError
    redirect="/abc"
    :error="{
      statusCode: 404,
      statusMessage: $t('page.error.notFound.title'),
      message: $t('page.error.notFound.description'),
    }"
  >
    <template #links>
      <UButton to="/" color="primary">{{ $t('button.backToHome') }}</UButton>
    </template>
  </UError>
</template>
