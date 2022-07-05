import accounts from './accounts.js'
import admin from './admin.js'

export default function () {
  const accountsConnectors = accounts(fetch, window.config.accountsApiBaseUrl)
  const adminConnectors = admin(fetch, window.config.adminApiBaseUrl)

  return { adminConnectors, accountsConnectors }
}
