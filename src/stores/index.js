import createCurrentUserStore from './currentUser.js'
import createAdminsStore from './admins.js'
import createAccountsStore from './accounts.js'
import connectors from '../connectors/index.js'

const useCurrentUserStore = () => {
  const store = createCurrentUserStore(connectors().adminConnectors)
  return store()
}

const useAdminsStore = () => {
  const store = createAdminsStore(connectors().adminConnectors)
  return store()
}

const useAccountStore = () => {
  const store = createAccountsStore(connectors().accountsConnectors)
  return store()
}

export { useCurrentUserStore, useAdminsStore, useAccountStore }
