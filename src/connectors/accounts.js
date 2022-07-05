import { createGetConnector } from 'standard-json-api-connectors'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = () => {
    return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }

  const generateAccountsRoute = () => '/v1/accounts/'

  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)

  const list = async function (params, query) {
    const res = await getAccounts({}, query)
    return res
  }

  return {
    account: { list }
  }
}
