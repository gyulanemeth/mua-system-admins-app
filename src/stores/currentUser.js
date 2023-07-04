import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import jwtDecode from 'jwt-decode'

import RouteError from '../errors/RouteError.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const router = useRouter() || [] // [] for testing

  const storage = {}

  const storedAccessToken = localStorage.getItem('accessToken')
  if (storedAccessToken) {
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
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async sendInvitation (email) {
        try {
          const res = await connectors.invitation.send({ email })
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
          return name
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
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchEmail (newEmail, newEmailAgain) {
        try {
          if (!this.user || !this.user._id) {
            throw new RouteError('Admin ID Is Required')
          }
          const res = await connectors.admins.patchEmail({ id: this.user._id, newEmail, newEmailAgain })
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchEmailConfirm (token) {
        try {
          const tokenData = jwtDecode(token)
          if (!tokenData || !tokenData.user || !tokenData.user._id) {
            throw new RouteError('Valid Token Is Required')
          }
          const res = await connectors.admins.patchEmailConfirm({ id: tokenData.user._id, token })
          router.push('/')
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async readOne () {
        try {
          if (!this.user || !this.user._id) {
            throw new RouteError('Admin ID Is Required')
          }
          this.user = await connectors.admins.readOne({ id: this.user._id })
          return this.user
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async uploadProfilePicture (formData) {
        try {
          const res = await connectors.admins.uploadProfilePicture({ id: this.user._id }, formData)
          this.user.profilePicturePath = res.profilePicturePath
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async deleteProfilePicture () {
        try {
          const res = await connectors.admins.deleteProfilePicture({ id: this.user._id })
          delete this.user.profilePicturePath
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      }
    }
  })

  return currentUserStore
}
