import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

async () => {
  const config = await import('/config.js')
}

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
