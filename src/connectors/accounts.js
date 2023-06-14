import { createGetConnector, createPostConnector } from 'standard-json-api-connectors'

import RouteError from '../errors/RouteError.js'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = () => {
    return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }

  const generateAccountsRoute = () => '/v1/accounts'

  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)
  const createAccount = createPostConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)

  const list = async function (params, query) {
    const res = await getAccounts({}, query)
    return res
  }

  const createOne = async function (formData) {
    if (!formData || !formData.name || !formData.urlFriendlyName) {
      throw new RouteError('Name And UrlFriendlyName Is Required')
    }
    const res = await createAccount({}, { name: formData.name, urlFriendlyName: formData.urlFriendlyName })
    return res
  }

  const uploadProfilePicture = async function (params, formData) {
    if (!params || !params.id || !formData) {
      throw new RouteError('param and form Data Is Required')
    }
    const url = `${apiUrl}/v1/accounts/${params.id}/profile-picture/`

    const requestOptions = {
      method: 'POST',
      headers: generateAdditionalHeaders(),
      body: formData
    }
    let res = await fetch(url, requestOptions)
    res = await res.json()
    return res.result
  }

  return {
    account: { list, createOne, uploadProfilePicture }
  }
}
