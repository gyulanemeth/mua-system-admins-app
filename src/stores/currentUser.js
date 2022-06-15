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
      loggedIn: () => !!this.user
    },
    actions: {
      login (email, password, passwordAgain) {
        // log in route -> login token -> access token
        // access token -> user id
        // saves the access token to local storage
        // user id -> fetch user data. (now it would be enough to use the user data, but later, we will need to fetch anyways, coz for example, the user's profile pic's url is not in the token)
      },
      logout () {
      },
      sendForgotPassword (email) {
      },
      resetForgotPassword (forgotPasswordToken, password, passwordAgain) {
      },
      sendInvitation () {},
      acceptInvitation () {},

      refreshAccessToken () {},

      patchName () {},
      patchPassword () {}
    }
  })

  return currentUserStore
}
