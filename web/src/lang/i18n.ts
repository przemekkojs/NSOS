import { createI18n, type I18nOptions } from 'vue-i18n'
import { en, pl } from '@/lang'

const options = {
  legacy: false,
  locale: 'pl',
  availableLocales: ['en', 'pl'],
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  },
} as const satisfies I18nOptions

export const i18n = createI18n(options)
