import { createGetConnector, createPostConnector } from 'standard-json-api-connectors'

import RouteError from '../errors/RouteError.js'
import { ConnectorError } from '../errors/ConnectorError.js'
import checkError from '../helpers/connectorsCatch.js'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = () => {
    return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }

  const generateAccountsRoute = () => '/v1/accounts'

  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)
  const createAccount = createPostConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)

  const list = async function (params, query) {
    try {
      const res = await getAccounts({}, query)
      return res
    } catch (error) {
      checkError(error)
    }
  }

  const createOne = async function (formData) {
    if (!formData || !formData.name || !formData.urlFriendlyName) {
      throw new RouteError('Name And UrlFriendlyName Is Required')
    }
    try {
      const res = await createAccount({}, { name: formData.name, urlFriendlyName: formData.urlFriendlyName })
      return res
    } catch (error) {
      checkError(error)
    }
  }

  const uploadLogo = async function (params, formData) {
    if (!params || !params.id || !formData) {
      throw new RouteError('param and form Data Is Required')
    }
    const url = `${apiUrl}/v1/accounts/${params.id}/logo/`

    const requestOptions = {
      method: 'POST',
      headers: generateAdditionalHeaders(),
      body: formData
    }
    try {
      let res = await fetch(url, requestOptions)
      res = await res.json()
      if (res.error) {
        throw new ConnectorError(res.status, res.error.name, res.error.message)
      }
      return res.result
    } catch (error) {
      checkError(error)
    }
  }

  return {
    account: { list, createOne, uploadLogo }
  }
}
