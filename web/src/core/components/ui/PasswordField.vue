<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'

const model = defineModel<string>()

interface PasswordInputProps extends Omit<InputProps, 'model' | 'modelValue'> {
  show?: boolean
  label?: string
  name?: string
}
const { show = false, ...props } = defineProps<PasswordInputProps>()

const type = computed(() => (show ? 'text' : 'password'))
const color = 'primary'
</script>
<template>
  <UFormField
    :label="props.label ?? $t('form.label.password')"
    :name="props.name ?? 'password'"
    required
  >
    <UInput
      v-model="model"
      v-bind="props"
      :placeholder="props.placeholder ?? $t('form.placeholder.password')"
      :color="color"
      :type="type"
      class="w-full"
    />
  </UFormField>
</template>
