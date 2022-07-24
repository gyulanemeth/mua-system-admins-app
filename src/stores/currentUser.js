import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import RouteError from '../errors/RouteError.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const storage = {}
  const storedAccessToken = localStorage.getItem('accessToken')
   if (!storedAccessToken || Date.now() >= jwtDecode(storedAccessToken).exp * 1000) {
  /*   if (window.location.pathname !== "/") {
       window.location.href = "/";
     }*/
   }else {
     storage.user = jwtDecode(storedAccessToken).user
     storage.accessToken = storedAccessToken
  /*   if (window.location.pathname === "/") {
       window.location.pathname = "/admins";
     }*/
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
          this.accessToken = await connectors.admins.login({ email, password })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({ id: tokenData.user._id })
          this.user = await connectors.admins.readOne({ id: tokenData.user._id })
          window.location.pathname = "/admins";
          return this.user
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      logout () {
        localStorage.removeItem('accessToken')
        this.accessToken = null
        this.user = null
        window.location.href = "/";
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
      async acceptInvitation (acceptInvitationToken, newPassword, newPasswordAgain, name) {
        try {
          this.accessToken = await connectors.invitation.accept({ token: acceptInvitationToken, newPassword, newPasswordAgain, name })
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
            console.log(this.user);
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
