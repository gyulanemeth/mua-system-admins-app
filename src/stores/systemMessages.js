import { defineStore } from 'pinia'

export default defineStore('systemMessages', {
  state: () => ({
    items: []
  }),
  actions: {
    addSystemMessage ({ type, status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 } = {}) {
      const item = { type, state: 'fading-in', status, name, message }
      this.items.push(item)
      setTimeout(() => (this.items[this.items.indexOf(item)].state = 'fully-visible'), fullyVisibleAfter)
      setTimeout(() => (this.items[this.items.indexOf(item)].state = 'fading-out'), fadingOurAfter)
      setTimeout(() => (this.items.splice(this.items.indexOf(item), 1)), removeAfter)
    },
    addError ({ status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 } = {}) {
      this.addSystemMessage({ type: 'error', status, name, message }, { fullyVisibleAfter, fadingOurAfter, removeAfter })
    },
    addWarning ({ status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 } = {}) {
      this.addSystemMessage({ type: 'warning', status, name, message }, { fullyVisibleAfter, fadingOurAfter, removeAfter })
    },
    addInfo ({ status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 } = {}) {
      this.addSystemMessage({ type: 'info', status, name, message }, { fullyVisibleAfter, fadingOurAfter, removeAfter })
    },
    addSuccess ({ status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 } = {}) {
      this.addSystemMessage({ type: 'success', status, name, message }, { fullyVisibleAfter, fadingOurAfter, removeAfter })
    }
  }
})
