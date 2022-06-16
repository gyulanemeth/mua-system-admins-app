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
      login (email, password, passwordAgain) {
        // log in route -> login token -> access token
        // access token -> user id
        // saves the access token to local storage
        // user id -> fetch user data. (now it would be enough to use the user data, but later, we will need to fetch anyways, coz for example, the user's profile pic's url is not in the token)
      },
      logout () {
        // delete token from localstorage
        // forward to /
      },
      sendForgotPassword (email) {
      },
      resetForgotPassword (forgotPasswordToken, password, passwordAgain) {
        // I'm thinking about how we should handle these kind of tokens...
      },
      sendInvitation (email) {},
      acceptInvitation (acceptInvitationToken, password, passwordAgain) {},

      refreshAccessToken () {},

      patchName (name) {},
      patchPassword (oldPassword, newPassword, newPasswordAgain) {}
    }
  })

  return currentUserStore
}
