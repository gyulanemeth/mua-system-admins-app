import { defineStore } from 'pinia'

export const systemMessagesStore = defineStore('systemMessages', {
  state: () => ({
    items: []
  }),
  actions: {
    addSystemMessage ({ type, status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4750, removeAfter = 5000 }) {
      const item = { type, state: 'fading-in', status, name, message }
      this.items.push(item)
      setTimeout(() => (item.state = 'fully-visible'), fullyVisibleAfter)
      setTimeout(() => (item.state = 'fading-out'), fadingOurAfter)
      setTimeout(() => (item.state.splice(this.items.indexOf(item), 1)), removeAfter)
    },
    addErrorMessage ({ status, name, message }, { fullyVisibleAfter = 250, fadingOurAfter = 4500, removeAfter = 250 }) {
      this.addSystemMessage({ type: 'error', status, name, message })
    },
    addWarning ({ status, name, message }) {
      this.items.push({ type: 'warning', name, message })
    },
    addInfo ({ status, name, message }) {
      this.items.push({ type: 'info', name, message })
    },
    addSuccess ({ status, name, message }) {
      this.items.push({ type: 'success', name, message })
    }
  }
})
