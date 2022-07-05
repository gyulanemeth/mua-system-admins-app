import useCurrentUserStore from './currentUser.js'
import useAdminsStore from './admins.js'
import useAccountsStore from './accounts.js'
import connectors from '../connectors/index.js'

export default function () {
  const currentUserStore = useCurrentUserStore(connectors().adminConnectors)
  const adminsStore = useAdminsStore(connectors().adminConnectors)
  const accountStore = useAccountsStore(connectors().accountsConnectors)

  return { currentUserStore, adminsStore, accountStore }
}
