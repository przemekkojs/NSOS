<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'

const model = defineModel<string>()

interface PasswordInputProps {
  show?: boolean
  label?: string
  name?: string
  placeholder?: string
}
const { show = false, label=undefined, name = undefined,  ...props } = defineProps<PasswordInputProps>()

const type = computed(() => (show ? 'text' : 'password'))
const color = 'primary'
</script>
<template>
  <UFormField
    :label="label ?? $t('form.label.password')"
    :name="name ?? 'password'"
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
