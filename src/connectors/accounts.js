import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'


export default function (fetch, apiUrl ){

  const generateAdditionalHeaders = (params) => {
    return { Authorization: 'Bearer mybearertoken' }
  }

  const generateAccountsRoute = () => {
    return `/v1/accounts`
  }
  const getAccounts = createGetConnector(fetch, apiUrl, generateAccountsRoute, generateAdditionalHeaders)


  const list = function (){
    const res = await getAccounts();
    return res;
  }


  return {
    account: { list }
  }
}
