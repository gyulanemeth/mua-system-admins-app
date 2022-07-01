import {
  createGetConnector
} from 'standard-json-api-connectors'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = (params) => {
    return { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
  }

  const generateAccountsRoute = (query) => {
    return `/v1/accounts${query ? '?' + query : ''}`
  }

  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)

  const list = async function (_ = undefined, query) {
    const res = await getAccounts(_ = undefined, query)
    return res
  }

  return {
    account: { list }
  }
}
