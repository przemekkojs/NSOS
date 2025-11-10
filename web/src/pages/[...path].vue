<template>
  <UError
    redirect="/abc"
    :error="{
      statusCode: 404,
      statusMessage: $t('error.pageNotFound'),
      message: $t('error.pageNotFoundDescription'),
    }"
  >
    <template #links>
      <UButton to="/" color="primary">{{ $t('error.backToHome') }}</UButton>
    </template>
  </UError>
</template>
