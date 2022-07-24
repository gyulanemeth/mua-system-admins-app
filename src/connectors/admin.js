import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'

import RouteError from '../errors/RouteError.js'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = () => {
    return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }

  const generateAdminRoute = (params) => `/v1/admins${params.id ? '/' + params.id : ''}`
  const generateTokenRoute = (params) => `/v1/admins/${params.id}/access-token`

  const generateConfigRoute = () => '/v1/config'

  const generatePatchNameRoute = (params) => `/v1/admins/${params.id}/name`
  const generatePatchPasswordRoute = (params) => `/v1/admins/${params.id}/password`

  const generateLoginRoute = () => '/v1/login'
  const generateSendInvitationRoute = () => '/v1/invitation/send'
  const generateAcceptInvitationRoute = () => '/v1/invitation/accept'
  const generateSendForgotPasswordRoute = () => '/v1/forgot-password/send'
  const generateResetForgotPasswordRoute = () => '/v1/forgot-password/reset'

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

  const list = async function (param, query) {
    const res = await getAdmin({}, query)
    return res
  }

  const readOne = async function (id) {
    if (!id) {
      throw new RouteError('Admin ID Is Required')
    }
    const res = await getAdmin(id)
    return res
  }

  const getAccessToken = async function (data) {
    if (!data || !data.id) {
      throw new RouteError('Admin ID Is Required')
    }
    const res = await getToken({ id: data.id })
    if (res.accessToken) {
      localStorage.setItem('accessToken', res.accessToken)
    }
    return res
  }

  const deleteOne = async function (id) {
    if (!id) {
      throw new RouteError('Admin ID Is Required')
    }
    const res = await del(id)
    return res
  }

  const patchName = async function (formData) {
    if (!formData || !formData.id || !formData.name) {
      throw new RouteError('Admin ID And New Name Is Required')
    }
    const res = await updateName({ id: formData.id }, { name: formData.name })
    return res
  }
  const patchPassword = async function (formData) {
    if (!formData || !formData.id || !formData.oldPassword || !formData.newPassword || !formData.newPasswordAgain) {
      throw new RouteError('Admin ID And New Password Is Required')
    }
    const res = await updatePassword({ id: formData.id }, { oldPassword: formData.oldPassword, newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    return res
  }

  const login = async function (formData) {
    if (!formData || !formData.email || !formData.password) {
      throw new RouteError('Admin Email And Password Is Required')
    }
    const res = await postLogin({}, { email: formData.email, password: formData.password })
    if (res.loginToken) {
      localStorage.setItem('accessToken', res.loginToken)
    }
    return res.loginToken
  }

  const sendInvitation = async function (data) {
    if (!data || !data.email) {
      throw new RouteError('Email Is Required')
    }
    const res = await postSendInvitation({}, { email: data.email })
    return res
  }

  const accept = async function (formData) {
    if (!formData || !formData.token || !formData.newPassword || !formData.newPasswordAgain || !formData.name) {
      throw new RouteError('Admin Password Is Required')
    }
    localStorage.setItem('accessToken', formData.token)
    const res = await postAcceptedInvitaion({}, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain, name: formData.name })
    if (res.loginToken) {
      localStorage.setItem('accessToken', res.loginToken)
    }
    return res
  }

  const sendForgotPassword = async function (data) {
    if (!data || !data.email) {
      throw new RouteError('Email Is Required')
    }
    const res = await postSendForgotPassword({}, { email: data.email })
    return res
  }

  const reset = async function (formData) {
    if (!formData || !formData.token || !formData.newPassword || !formData.newPasswordAgain) {
      throw new RouteError('Admin Password Is Required')
    }
    localStorage.setItem('accessToken', formData.token)
    const res = await postResetForgotPassword({}, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    if (res.loginToken) {
      localStorage.setItem('accessToken', res.loginToken)
    }
    return res
  }

  const getConfig = async function () {
    const res = await getAdminConfig()
    return res
  }

  return {
    admins: { list, readOne, deleteOne, patchName, patchPassword, getAccessToken, login },
    invitation: { send: sendInvitation, accept },
    forgotPassword: { send: sendForgotPassword, reset },
    config: { getConfig }
  }
}
