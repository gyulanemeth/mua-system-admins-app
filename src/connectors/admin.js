import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'

const apiUrl = 'https://mua-api.com/'

const generateAdditionalHeaders = (params) => {
  return { Authorization: 'Bearer mybearertoken' }
}


//All Admin Get req
const generateAdminRoute = (params) => {
  return `/v1/admins/${params.userId? params.userId : ''}`
}
const getAdmin = createGetConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)


const generateTokenRoute = (params) => {
  return `/v1/admins/${params.userId}/access-token`
}
const getToken = createGetConnector(fetch, apiUrl, generateTokenRoute, generateAdditionalHeaders)


const generateConfigRoute = (params) => {
  return `/v1/config`
}
const getConfig = createGetConnector(fetch, apiUrl, generateConfigRoute, generateAdditionalHeaders)


exports.getAdminList = function (){
  const adminList = await getAdmin();
  return adminList;
}

exports.getAdmin = function (id){
  const admin = await getAdmin({ userId: id })
  return admin;
}


exports.getAccessToken = function (id){
  const token = getToken({ userId: id })
  return token;
}


exports.getConfig = function (){
  const config = getConfig()
  return config;
}







/*
// All Admin Delete req
const del = createDeleteConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)
// All Admin Patch req
const patchName = createPatchConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)
const patchPassword = createPatchConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)
// All Admin Post req
const postLogin = createPostConnector(fetch, apiUrl, generateRoute)
const postSendInvitation = createPostConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)
const postAcceptedInvitaion = createPostConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)
const postSendForgotPassword = createPostConnector(fetch, apiUrl, generateRoute)
const postResetForgotPassword = createPostConnector(fetch, apiUrl, generateRoute, generateAdditionalHeaders)

*/

/*
const deletedAdmin = await del({ userId: 2 })

const updatedName = patchName({ userId: 2 })
const updatedPassword = patchPassword({ userId: 2 })

const login = await postLogin()
const sendInvitation = await postSendInvitation()
const acceptedInvitaion = await postAcceptedInvitaion()
const sendForgotPassword = await postSendForgetPassword()
const resetForgotPassword = await postResetForgetPassword()
*/
