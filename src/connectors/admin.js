import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'


export default function (fetch, apiUrl ){

  const generateAdditionalHeaders = (params) => {
    return { Authorization: 'Bearer '+ localStorage.getItem("accessToken") }
  }

  const generateAdminRoute = (params) => {
    return `/v1/admins/${params.id? params.id : ''}`
  }
  const getAdmin = createGetConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)
  const del = createDeleteConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)

  const getToken = createGetConnector(fetch, apiUrl, generateTokenRoute, generateAdditionalHeaders)
  const generateTokenRoute = (params) => {
    return `/v1/admins/${params.id}/access-token`
  }

  const generateConfigRoute = () => {
    return `/v1/config`
  }
  const getConfig = createGetConnector(fetch, apiUrl, generateConfigRoute)

  const generatePatchNameRoute = (params) => {
    return `/v1/admins/${params.id}/name`
  }
  const updateName = createPatchConnector(fetch, apiUrl, generatePatchNameRoute, generateAdditionalHeaders)

  const generatePatchPasswordRoute = (params) => {
    return `/v1/admins/${params.id}/password`
  }
  const updatePassword = createPatchConnector(fetch, apiUrl, generatePatchPasswordRoute, generateAdditionalHeaders)

  const generateLoginRoute = () => {
    return `/v1/login`
  }
  const postLogin = createPostConnector(fetch, apiUrl, generateLoginRoute)

  const generateSendInvitationRoute = () => {
    return `/v1/invitation/send`
  }
  const postSendInvitation = createPostConnector(fetch, apiUrl, generateSendInvitationRoute, generateAdditionalHeaders)

  const generateAcceptInvitationRoute = () => {
    return `/v1/invitation/accept`
  }
  const postAcceptedInvitaion = createPostConnector(fetch, apiUrl, generateAcceptInvitationRoute, generateAdditionalHeaders)

  const generateSendForgotPasswordRoute = () => {
    return `/v1/forgot-password/send`
  }
  const postSendForgotPassword = createPostConnector(fetch, apiUrl, generateForgotPasswordRoute)

  const generateResetForgotPasswordRoute = () => {
    return `/v1/forgot-password/reset`
  }
  const postResetForgotPassword = createPostConnector(fetch, apiUrl, generateResetForgotPasswordRoute, generateAdditionalHeaders)


  const list = function (){
    const res = await getAdmin();
    return res;
  }

  const readOne = function (id){
    const res = await getAdmin({ id: id })
    return res;
  }


  const getAccessToken = function (id){
    const res = await getToken({ id: id })
    return res;
  }

  const deletedOne = function(id){
    const res = await del({ id: id })
    return res
  }

  const patchName = function(id, name){
    const res = await updateName({ id: id }, {name: name})
    return res
  }
  const patchPassword = function(id, password){
    const res = await patchPassword({ id: id }, {password: password})
    return res
  }

  const login = function(formData){
    const res = await postLogin({},{ email:formData.email, password: formData.password})
    if(res.loginToken){
      localStorage.setItem("accessToken", res.loginToken);
    }
    return res
  }

  const sendInvitation = function(email){
    const res = await postSendInvitation({},{ email: email })
    return res
  }

  const accept = function(formData){
    const res = await postAcceptedInvitaion({},{ password: formData.password, passwordAgain: formData.passwordAgain })
    return res
  }

  const sendForgotPassword = function(email){
    const res = await postSendForgetPassword({},{ email: email })
    return res
  }

  const reset = function(){
    const resetForgotPassword = await postResetForgetPassword({},{ password: formData.password, passwordAgain: formData.passwordAgain })
    return res
  }

  const getConfig = function (){
    const res = await getConfig()
    return res;
  }

  return {
    admins: { list, readOne, deleteOne, patchName, patchPassword, getAccessToken, login },
    forgotPassword: { send: sendForgotPassword, reset },
    invitation: { send: sendInvitation, accept },
    config: { getConfig }
  }
}
