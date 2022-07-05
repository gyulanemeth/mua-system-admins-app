import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import RouteError from '../errors/RouteError.js'
import useSystemMessagesStore from './systemMessages.js'

// this one will be a generic store representing the actual user sitting in front of any of the apps.
// in this case it is a system-admin user

export default (connectors) => {
  // check access token in localStorage here.
  // if there is no access token -> forward to the login page
  // if the token is expired -> forward to the login page
  const currentUserStore = defineStore('currentUser', {
    state: () => ({
      accessToken: null,
      user: null // _id, name, email, later: profilePic
    }),
    getters: {
      loggedIn () {
        return !!this.user
      }
    },
    actions: {

      async login (email, password) {
        try {
          this.accessToken = await connectors.admins.login({ email, password })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: tokenData.user._id })
          this.user = await connectors.admins.readOne({ id: tokenData.user._id })
          return this.user
          // forward to /
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      logout () {
        localStorage.removeItem('accessToken')
        this.accessToken = null
        this.user = null
        // forward to /
      },

      async  sendForgotPassword (email) {
        try {
          await connectors.forgotPassword.send({ email })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async  resetForgotPassword (forgotPasswordToken, newPassword, newPasswordAgain) {
        // I'm thinking about how we should handle these kind of tokens...
        try {
          this.accessToken = await connectors.forgotPassword.reset({ token: forgotPasswordToken, newPassword, newPasswordAgain })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: tokenData.user._id })
          this.user = await connectors.admins.readOne({ id: tokenData.user._id })
          return 'success'
          // forward to /
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async sendInvitation (email) {
        try {
          await connectors.invitation.send({ email })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async acceptInvitation (acceptInvitationToken, newPassword, newPasswordAgain) {
        try {
          this.accessToken = await connectors.invitation.accept({ token: acceptInvitationToken, newPassword, newPasswordAgain })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: tokenData.user._id })
          this.user = await connectors.admins.readOne({ id: tokenData.user._id })
          return 'success'
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
          return 'success'
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
      }
    }
  })

  return currentUserStore
}
