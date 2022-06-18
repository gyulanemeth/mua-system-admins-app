import jwt_decode from "jwt-decode";
import { defineStore } from 'pinia'
import RouteError from '../errors/RouteError.js'
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
          this.accessToken = await connectors.admins.login({email: email, password: password})
          const tokenData = jwt_decode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({id: tokenData.user._id})
          this.user = await connectors.admins.readOne({id: tokenData.user._id})
          return this.user
          // forward to /
        } catch (e) {
          return e
        }
      },

      logout () {
         localStorage.removeItem("accessToken");
         this.accessToken = null
         this.user = null
        // forward to /
      },

    async  sendForgotPassword (email) {
        try {
          const status = await connectors.forgotPassword.send({email:email})
          return status
        } catch (e) {
          return e
        }
      },

    async  resetForgotPassword (forgotPasswordToken, newPassword, newPasswordAgain) {
        // I'm thinking about how we should handle these kind of tokens...
        try {
          this.accessToken = await connectors.forgotPassword.reset({newPassword: newPassword, newPasswordAgain: newPasswordAgain})
          const tokenData = jwt_decode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({id: tokenData.user._id})
          this.user = await connectors.admins.readOne({id: tokenData.user._id})
          return "success"
          // forward to /
        } catch (e) {
          return e
        }
      },

    async sendInvitation (email) {
        try {
          const status = await connectors.invitation.send({email:email})
          return status
        } catch (e) {
          return e
        }
      },
      async acceptInvitation (acceptInvitationToken, newPassword, newPasswordAgain) {
        try {
          this.accessToken = await connectors.invitation.accept({newPassword: newPassword, newPasswordAgain: newPasswordAgain })
          const tokenData = jwt_decode(this.accessToken)
          this.accessToken = await connectors.admins.getAccessToken({id: tokenData.user._id})
          this.user = await connectors.admins.readOne({id: tokenData.user._id})
          return "success"
        } catch (e) {
          return e
        }
      },

      async refreshAccessToken () {//email
        try {
          if(this.user === null || this.user._id === undefined ){
            throw new RouteError("Admin ID Is Required")
          }
          this.accessToken = await connectors.admins.getAccessToken({id:this.user._id})
        } catch (e) {
          return e
        }
      },

      async patchName (name) {
        try {
          if(this.user === null || this.user._id === undefined ){
            throw new RouteError("Admin ID Is Required")
          }
           await connectors.admins.patchName({id: this.user._id, name:name})
          this.user.name = name
          return "success"
        } catch (e) {
          return e
        }
      },

      async patchPassword (oldPassword, newPassword, newPasswordAgain) {
        try {
          if(this.user === null || this.user._id === undefined ){
            throw new RouteError("Admin ID Is Required")
          }
           await connectors.admins.patchPassword({id: this.user._id, oldPassword:oldPassword, newPassword: newPassword, newPasswordAgain: newPasswordAgain})
           return "success"
        } catch (e) {
          return e
        }
      }
    }
  })

  return currentUserStore
}
