import {
  createGetConnector
} from 'standard-json-api-connectors'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = (params) => {
    return { Authorization: 'Bearer  ' + localStorage.getItem('accessToken') }
  }

  const generateAccountsRoute = () => {
    return '/v1/accounts'
  }
  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)

  const list = async function () {
    const res = await getAccounts()
    return res
  }

  return {
    account: { list }
  }
}
