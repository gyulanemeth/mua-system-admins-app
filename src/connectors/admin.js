import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'
import RouteError from '../errors/RouteError.js'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = (params) => {
    return { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
  }

  const generateAdminRoute = (params) => {
    return `/v1/admins${params.id ? '/' + params.id : ''}`
  }

  const generateTokenRoute = (params) => {
    return `/v1/admins/${params.id}/access-token`
  }

  const generateConfigRoute = () => {
    return '/v1/config'
  }

  const generatePatchNameRoute = (params) => {
    return `/v1/admins/${params.id}/name`
  }

  const generatePatchPasswordRoute = (params) => {
    return `/v1/admins/${params.id}/password`
  }

  const generateLoginRoute = () => {
    return '/v1/login'
  }

  const generateSendInvitationRoute = () => {
    return '/v1/invitation/send'
  }

  const generateAcceptInvitationRoute = () => {
    return '/v1/invitation/accept'
  }

  const generateSendForgotPasswordRoute = () => {
    return '/v1/forgot-password/send'
  }

  const generateResetForgotPasswordRoute = () => {
    return '/v1/forgot-password/reset'
  }

  const getAdmin = createGetConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)
  const del = createDeleteConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)
  const getToken = createGetConnector(fetch, apiUrl, generateTokenRoute, generateAdditionalHeaders)
  const getAdminConfig = createGetConnector(fetch, apiUrl, generateConfigRoute)
  const updateName = createPatchConnector(fetch, apiUrl, generatePatchNameRoute, generateAdditionalHeaders)
  const updatePassword = createPatchConnector(fetch, apiUrl, generatePatchPasswordRoute, generateAdditionalHeaders)
  const postLogin = createPostConnector(fetch, apiUrl, generateLoginRoute)
  const postSendInvitation = createPostConnector(fetch, apiUrl, generateSendInvitationRoute, generateAdditionalHeaders)
  const postAcceptedInvitaion = createPostConnector(fetch, apiUrl, generateAcceptInvitationRoute, generateAdditionalHeaders)
  const postSendForgotPassword = createPostConnector(fetch, apiUrl, generateSendForgotPasswordRoute)
  const postResetForgotPassword = createPostConnector(fetch, apiUrl, generateResetForgotPasswordRoute, generateAdditionalHeaders)

  const list = async function () {
    const res = await getAdmin({})
    return res
  }

  const readOne = async function (id) {
    const res = await getAdmin(id)
    return res
  }

  const getAccessToken = async function (id) {
    const res = await getToken(id)
    if (res.accessToken) {
      localStorage.setItem('accessToken', res.accessToken)
    }
    return res
  }

  const deleteOne = async function (id) {
    if (id === undefined) {
      return new RouteError('Admin ID Is Required')
    }
    const res = await del(id)
    return res
  }

  const patchName = async function (formData) {
    if (formData === undefined || formData.id === undefined || formData.name === undefined) {
      return new RouteError('Admin ID And New Name Is Required')
    }
    const res = await updateName({ id: formData.id }, { name: formData.name })
    return res
  }
  const patchPassword = async function (formData) {
    if (formData === undefined || formData.id === undefined || formData.newPassword === undefined || formData.newPasswordAgain === undefined) {
      return new RouteError('Admin ID And New Password Is Required')
    }
    const res = await updatePassword({ id: formData.id }, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    return res
  }

  const login = async function (formData) {
    if (formData === undefined || formData.email === undefined || formData.password === undefined) {
      return new RouteError('Admin Email And Password Is Required')
    }
    const res = await postLogin({}, { email: formData.email, password: formData.password })
    if (res.loginToken) {
      localStorage.setItem('accessToken', res.loginToken)
    }
    return res
  }

  const sendInvitation = async function (email) {
    if (email === undefined) {
      return new RouteError('Email Is Required')
    }
    const res = await postSendInvitation({}, email)
    return res
  }

  const accept = async function (formData) {
    if (formData === undefined || formData.password === undefined || formData.passwordAgain === undefined) {
      return new RouteError('Admin Password Is Required')
    }
    const res = await postAcceptedInvitaion({}, { password: formData.password, passwordAgain: formData.passwordAgain })
    return res
  }

  const sendForgotPassword = async function (email) {
    if (email === undefined) {
      return new RouteError('Admin Email Is Required')
    }
    const res = await postSendForgotPassword({}, email)
    return res
  }

  const reset = async function (formData) {
    if (formData === undefined || formData.password === undefined || formData.passwordAgain === undefined) {
      return new RouteError('Admin Password Is Required')
    }
    const res = await postResetForgotPassword({}, { password: formData.password, passwordAgain: formData.passwordAgain })
    return res
  }

  const getConfig = async function () {
    const res = await getAdminConfig()
    return res
  }

  return {
    admins: { list, readOne, deleteOne, patchName, patchPassword, getAccessToken, login },
    forgotPassword: { send: sendForgotPassword, reset },
    invitation: { send: sendInvitation, accept },
    config: { getConfig }
  }
}
