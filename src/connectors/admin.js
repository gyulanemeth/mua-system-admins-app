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
  const generatePatchEmailRoute = (params) => `/v1/admins/${params.id}/email`
  const generatePatchConfirmEmailRoute = (params) => `/v1/admins/${params.id}/email-confirm`

  const generateLoginRoute = () => '/v1/login'
  const generateSendInvitationRoute = () => '/v1/invitation/send'
  const generateAcceptInvitationRoute = () => '/v1/invitation/accept'
  const generateSendForgotPasswordRoute = () => '/v1/forgot-password/send'
  const generateResetForgotPasswordRoute = () => '/v1/forgot-password/reset'

  const generateDeletePermissionRoute = () => '/v1/admins/permission/delete'

  const getAdmin = createGetConnector(fetch, apiUrl, generateAdminRoute, generateAdditionalHeaders)
  const del = createDeleteConnector(fetch, apiUrl, generateAdminRoute, () => ({ Authorization: `Bearer ${localStorage.getItem('delete-permission-token')}` }))
  const getToken = createGetConnector(fetch, apiUrl, generateTokenRoute, () => ({ Authorization: `Bearer ${localStorage.getItem('loginToken')}` }))
  const getAdminConfig = createGetConnector(fetch, apiUrl, generateConfigRoute)
  const updateName = createPatchConnector(fetch, apiUrl, generatePatchNameRoute, generateAdditionalHeaders)
  const updatePassword = createPatchConnector(fetch, apiUrl, generatePatchPasswordRoute, generateAdditionalHeaders)
  const postLogin = createPostConnector(fetch, apiUrl, generateLoginRoute)
  const postSendInvitation = createPostConnector(fetch, apiUrl, generateSendInvitationRoute, generateAdditionalHeaders)
  const postAcceptedInvitaion = createPostConnector(fetch, apiUrl, generateAcceptInvitationRoute, () => ({ Authorization: `Bearer ${localStorage.getItem('invitationToken')}` }))
  const postSendForgotPassword = createPostConnector(fetch, apiUrl, generateSendForgotPasswordRoute)
  const postResetForgotPassword = createPostConnector(fetch, apiUrl, generateResetForgotPasswordRoute, () => ({ Authorization: `Bearer ${localStorage.getItem('resetPasswordToken')}` }))
  const updateEmail = createPatchConnector(fetch, apiUrl, generatePatchEmailRoute, generateAdditionalHeaders)
  const confirmEmailUpdate = createPatchConnector(fetch, apiUrl, generatePatchConfirmEmailRoute, () => ({ Authorization: `Bearer ${localStorage.getItem('verifyEmailToken')}` }))
  const delPermission = createPostConnector(fetch, apiUrl, generateDeletePermissionRoute, generateAdditionalHeaders)

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
    localStorage.removeItem('delete-permission-token')
    return res
  }

  const deletePermission = async function (password) {
    if (!password) {
      throw new RouteError('Password Is Required')
    }
    const res = await delPermission({}, { password })
    localStorage.setItem('delete-permission-token', res.permissionToken)
  }

  const patchName = async function (formData) {
    if (!formData || !formData.id || !formData.name) {
      throw new RouteError('Admin ID And New Name Required')
    }
    const res = await updateName({ id: formData.id }, { name: formData.name })
    return res
  }
  const patchPassword = async function (formData) {
    if (!formData || !formData.id || !formData.oldPassword || !formData.newPassword || !formData.newPasswordAgain) {
      throw new RouteError('Admin ID, New Password, Old Password and confirm Password Required')
    }
    const res = await updatePassword({ id: formData.id }, { oldPassword: formData.oldPassword, newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    return res
  }

  const login = async function (formData) {
    if (!formData || !formData.email || !formData.password) {
      throw new RouteError('Admin Email And Password Required')
    }
    const res = await postLogin({}, { email: formData.email, password: formData.password })
    if (res.loginToken) {
      localStorage.setItem('loginToken', res.loginToken)
    }
    return res.loginToken
  }

  const sendInvitation = async function (data) {
    if (!data || !data.email) {
      throw new RouteError('Email and confirm Email Required')
    }
    const res = await postSendInvitation({}, { email: data.email })
    return res
  }

  const accept = async function (formData) {
    if (!formData || !formData.token || !formData.newPassword || !formData.newPasswordAgain || !formData.name) {
      throw new RouteError('New Password, confirm Password, name and token Required')
    }
    localStorage.setItem('invitationToken', formData.token)
    const res = await postAcceptedInvitaion({}, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain, name: formData.name })
    if (res.loginToken) {
      localStorage.setItem('loginToken', res.loginToken)
      localStorage.removeItem('invitationToken')
    }
    return res.loginToken
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
      throw new RouteError('Admin Password and confirmPassword Required')
    }
    localStorage.setItem('resetPasswordToken', formData.token)
    const res = await postResetForgotPassword({}, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    if (res.loginToken) {
      localStorage.setItem('loginToken', res.loginToken)
      localStorage.removeItem('resetPasswordToken')
    }
    return res.loginToken
  }

  const getConfig = async function () {
    const res = await getAdminConfig()
    return res
  }

  const patchEmail = async function (formData) {
    if (!formData || !formData.id || !formData.newEmail || !formData.newEmailAgain) {
      throw new RouteError('Admin ID, New Email and confirm Email Required')
    }
    const res = await updateEmail({ id: formData.id }, { newEmail: formData.newEmail, newEmailAgain: formData.newEmailAgain })
    return res
  }

  const patchEmailConfirm = async function (formData) {
    if (!formData || !formData.id || !formData.token) {
      throw new RouteError('Admin ID and token Required')
    }
    localStorage.setItem('verifyEmailToken', formData.token)
    const res = await confirmEmailUpdate({ id: formData.id })
    localStorage.removeItem('verifyEmailToken')
    return res
  }

  return {
    admins: { list, readOne, deleteOne, patchName, patchPassword, getAccessToken, login, patchEmail, patchEmailConfirm, deletePermission },
    invitation: { send: sendInvitation, accept },
    forgotPassword: { send: sendForgotPassword, reset },
    config: { getConfig }
  }
}
