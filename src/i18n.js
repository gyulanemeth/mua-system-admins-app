import { createI18n } from 'vue-i18n'
import English from './locales/en.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: English
  }
})
