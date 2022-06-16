import jwt_decode from "jwt-decode";
import { defineStore } from 'pinia'

// this one will be a generic store representing the actual user sitting in front of any of the apps.
// in this case it is a system-admin user

export default (connectors) => {
  // check access token in localStorage here.
  // if there is no access token -> forward to the login page
  // if the token is expired -> forward to the login page
  const currentUserStore = defineStore('currentUser', {
    state: () => ({
      accessToken: null,
      user: null // id, name, email, later: profilePic  
    }),
    getters: {
      loggedIn () {
        return !!this.user
      }
    },
    actions: {
      async login (email, password) {
        try {
          // log in route -> login token -> access token
          this.accessToken = await connectors.admins.login({email: email, password: password})
          // access token -> user id
          const tokenData = jwt_decode(this.accessToken)
          // saves the access token to local storage     //done by connectors
          // user id -> fetch user data. (now it would be enough to use the user data, but later, we will need to fetch anyways, coz for example, the user's profile pic's url is not in the token)
          this.user = await connectors.admins.readOne({id: tokenData.id})
        } catch (e) {
          return e
        }
      },
      logout () {
        // delete token from localstorage
         localStorage.removeItem("accessToken");
         // i think we shoud clear the store state also so the user data is no longer saved any where
         this.accessToken = null
         this.user = null

        // forward to /
      },
      sendForgotPassword (email) {
        try {
          const status = await connectors.forgotPassword.send({email:email})
          return status
        } catch (e) {
          return e
        }
      },
      resetForgotPassword (forgotPasswordToken, password, passwordAgain) {
        // I'm thinking about how we should handle these kind of tokens...
      },
      sendInvitation (email) {
        try {
          const status = await connectors.invitation.send({email:email})
          return status
        } catch (e) {
          return e
        }
      },
      acceptInvitation (acceptInvitationToken, password, passwordAgain) {},

      refreshAccessToken () {
        try {
          this.accessToken = await connectors.admins.getAccessToken({id:this.user.id})
        } catch (e) {
          return e
        }
      },

      patchName (name) {
        try {
          this.user.name = await connectors.admins.patchName({id: this.user.id, name:name})
        } catch (e) {
          return e
        }
      },
      patchPassword (oldPassword, newPassword, newPasswordAgain) {
        try {
           const status = await connectors.admins.patchPassword({id: this.user.id, oldPassword:oldPassword, newPassword: newPassword, newPasswordAgain: newPasswordAgain})
           return status
        } catch (e) {
          return e
        }
      }
    }
  })

  return currentUserStore
}
