import { createI18n, type I18nOptions } from 'vue-i18n'
import en from './en.json'
import pl from './pl.json'

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
