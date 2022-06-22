import currentUser from './currentUser.js'
import admins from './admins.js'
import accounts from './accounts.js'
import connectors from '../connectors/index.js'
export default function (){

const currentUserStore =  currentUser(connectors().adminConnectors)
const adminsStore =  admins(connectors().adminConnectors)
const accountStore =  accounts(connectors().accountsConnectors)

  return {currentUserStore, adminsStore, accountStore}
}
