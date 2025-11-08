<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string>()

interface PasswordInputProps {
  show?: boolean
}
const { show = false } = defineProps<PasswordInputProps>()

const type = computed(() => (show ? 'text' : 'password'))
const color = 'primary'
</script>
<template>
  <UFormField label="Password" name="password" required>
    <UInput v-model="model" placeholder="Password" :color="color" :type="type" class="w-full" />
  </UFormField>
</template>
