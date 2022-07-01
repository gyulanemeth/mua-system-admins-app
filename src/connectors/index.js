// http://localhost:10000/
import accounts from './accounts.js'
import admin from './admin.js'

const apiUrl = 'http://localhost:10000'

export default function () {
  const accountsConnectors = accounts(fetch, 'http://localhost:20000') // mmmm how we gonna generalize this ?!!
  const adminConnectors = admin(fetch, apiUrl)

  return { adminConnectors, accountsConnectors }
}
