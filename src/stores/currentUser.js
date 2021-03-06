import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import jwtDecode from 'jwt-decode'

import RouteError from '../errors/RouteError.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const router = useRouter() || [] // [] for testing

  const storage = {}

  const storedAccessToken = localStorage.getItem('accessToken')
  if (!storedAccessToken || Date.now() >= jwtDecode(storedAccessToken).exp * 1000) {
    if (window.location.pathname !== '/forgot-password/reset' && window.location.pathname !== '/invitation/accept' && window.location.pathname !== '/forgot-password' && window.location.pathname !== '/') {
      router.push('/')
    }
  } else {
    storage.user = jwtDecode(storedAccessToken).user
    storage.accessToken = storedAccessToken
    if (window.location.pathname === '/') {
      router.push('/admins')
    }
  }

  const currentUserStore = defineStore('currentUser', {
    state: () => ({
      accessToken: storage.accessToken,
      user: storage.user
    }),
    getters: {
      loggedIn () {
        return !!this.user
      }
    },
    actions: {
      async login (email, password) {
        try {
          const loginToken = await connectors.admins.login({ email, password })
          const loginTokenData = jwtDecode(loginToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: loginTokenData.user._id })
          this.user = await connectors.admins.readOne({ id: loginTokenData.user._id })
          router.push('/admins')
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      logout () {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('loginToken')
        this.accessToken = null
        this.user = null
        router.push('/')
      },

      async  sendForgotPassword (email) {
        try {
          const res = await connectors.forgotPassword.send({ email })
          router.push('/')
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async  resetForgotPassword (forgotPasswordToken, newPassword, newPasswordAgain) {
        try {
          const resetPasswordToken = await connectors.forgotPassword.reset({ token: forgotPasswordToken, newPassword, newPasswordAgain })
          const resetPasswordTokenData = jwtDecode(resetPasswordToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: resetPasswordTokenData.user._id })
          this.user = await connectors.admins.readOne({ id: resetPasswordTokenData.user._id })
          router.push('/admins')
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async sendInvitation (email) {
        try {
          const res = await connectors.invitation.send({ email })
          router.push('/admins')
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async acceptInvitation (acceptInvitationToken, newPassword, newPasswordAgain, name) {
        try {
          const invitationToken = await connectors.invitation.accept({ token: acceptInvitationToken, newPassword, newPasswordAgain, name })
          const invitationTokenData = jwtDecode(invitationToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: invitationTokenData.user._id })
          this.user = await connectors.admins.readOne({ id: invitationTokenData.user._id })
          router.push('/admins')
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async refreshAccessToken () { // email
        try {
          if (!this.user || !this.user._id) {
            throw new RouteError('Admin ID Is Required')
          }
          this.accessToken = await connectors.admins.getAccessToken({ id: this.user._id })
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async patchName (name) {
        try {
          if (!this.user || !this.user._id) {
            throw new RouteError('Admin ID Is Required')
          }
          await connectors.admins.patchName({ id: this.user._id, name })
          this.user.name = name
          router.push('/admins')
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async patchPassword (oldPassword, newPassword, newPasswordAgain) {
        try {
          if (!this.user || !this.user._id) {
            throw new RouteError('Admin ID Is Required')
          }
          await connectors.admins.patchPassword({ id: this.user._id, oldPassword, newPassword, newPasswordAgain })
          router.push('/admins')
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      }
    }
  })

  return currentUserStore
}
