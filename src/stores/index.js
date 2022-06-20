import currentUser from './currentUser.js'
import connectors from '../connectors/index.js'
export default function (){

const currentUserStore =  currentUser(connectors().adminConnectors)

  return {currentUserStore}
}
