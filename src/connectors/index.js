//http://localhost:10000/
import accounts from './accounts.js'
import admin from './admin.js'
export default function (){

const apiUrl = "http://localhost:10000"
const accountsConnectors = accounts(fetch, apiUrl)
const adminConnectors = admin(fetch, apiUrl)

  return {
    adminConnectors, accountsConnectors
  }
}
