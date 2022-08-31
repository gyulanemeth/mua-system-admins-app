
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

loadFonts()
const pinia = createPinia()

/*

async () => {
  const config = await import('/config.js')
}
*/

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')

app.config.devtools = true
