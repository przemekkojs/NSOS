<script setup lang="ts">
import { getTextFromMessage } from '@nuxt/ui/runtime/utils/ai.js'
import type { UIMessage } from 'ai'
import * as marked from 'marked'
import DOMPurify from 'dompurify'

const messages = ref<UIMessage[]>([
  {
    id: '1',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "Hello! I'm your NSOS AI assistant. I can help you with:\n\n- Analyzing teacher workload and overtime\n- Finding optimal group schedules\n- Answering questions about academic regulations\n- Generating reports and summaries\n\nHow can I assist you today?",
      },
    ],
  },
])
const input = ref<string>('')
const status = ref<'ready' | 'streaming'>('ready')
const error = ref<Error | undefined>()

function onSubmit() {
  const trimmedInput = input.value.trim()
  if (trimmedInput) {
    messages.value.push({
      id: Date.now().toString(),
      role: 'user',
      parts: [
        {
          type: 'text',
          text: trimmedInput,
        },
      ],
    })
    input.value = ''
  }
}

const sanitize = (text: string) => {
  const rawMarkup = marked.parse(text, { async: false })
  const cleanMarkup = DOMPurify.sanitize(rawMarkup, {
    USE_PROFILES: { html: true },
  })
  return cleanMarkup
}
</script>
<template>
  <USlideover>
    <UTooltip :text="$t('feature.chat.tooltip')" :shortcuts="['C']">
      <UButton
        icon="i-lucide-bot-message-square"
        color="neutral"
        variant="ghost"
        class="cursor-pointer"
      />
    </UTooltip>

    <template #content>
      <UChatPalette>
        <UChatMessages
          :messages="messages"
          :status="status"
          :user="{
            side: 'right',
            variant: 'soft',
            // FIXME: replace with actual user avatar
            avatar: { src: 'https://github.com/benjamincanac.png' },
          }"
          :assistant="{ icon: 'i-lucide-bot', side: 'left', variant: 'naked' }"
        >
          <template #content="{ message }">
            <div v-html="sanitize(getTextFromMessage(message))" />
          </template>
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="input"
            icon="i-lucide-search"
            variant="naked"
            :error="error"
            :placeholder="$t('feature.chat.placeholder')"
            :disabled="status === 'streaming'"
            @submit="onSubmit"
          />
        </template>
      </UChatPalette>
    </template>
  </USlideover>
</template>
