import {test, beforeEach, expect, describe, vi} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import jwt from 'jsonwebtoken';
import { createApp } from 'vue'
import  currentUserStore  from './currentUser.js'
import RouteError from '../errors/RouteError.js'
describe('Current User Store', () => {

  const app = createApp({})
  const secrets = "verylongsecret1"

  const mokeConnector = () => {

    const mockLogin = (formData) => {
      if(formData === undefined || formData.email === undefined || formData.password === undefined ){
          throw new RouteError("Admin Email And Password Is Required")
        }
      const token = jwt.sign({ type: 'login', user: { _id: "12test12" } }, secrets)
      return token
    }
    const mockgetAccessToken = (data) => {
      if(data === undefined || data.id == undefined){
        throw new RouteError("Admin ID Is Required")
      }
      const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
      return  token
    }
    const mockgetReadOne = (id) => {
      if(id === undefined){
        throw new RouteError("Admin ID Is Required")
      }
      return { name: "user1", email: "user1@gmail.com", _id:"12test12" }
    }

    const mockSendForgetPasssword = (data) => {
      if(data === undefined || data.email === undefined){
          throw new RouteError("Email Is Required")
        }
      return { success:true }
    }
    const mockReset = async function(formData){
      if(formData === undefined || formData.newPassword === undefined || formData.newPasswordAgain === undefined ){
          throw new RouteError("Admin Password Is Required")
        }
      const token = jwt.sign({ type: 'login', user: { _id: "12test12" } }, secrets)
      return token
    }

    const mockSendInvitation = async function(data){
      if(data === undefined || data.email === undefined){
          throw new RouteError("Email Is Required")
        }
      return { success:true }
    }

    const mockAccept = async function(formData){
      if(formData === undefined || formData.newPassword === undefined || formData.newPasswordAgain === undefined ){
          throw new RouteError("Admin Password Is Required")
        }
        const token = jwt.sign({ type: 'login', user: { _id: "12test12" } }, secrets)
        return token
    }

    const mockPatchName = async function(formData){
      if(formData === undefined || formData.id === undefined || formData.name === undefined ){
          throw new RouteError("Admin ID And New Name Is Required")
        }
      return formData.name
    }
    const mockPatchPassword = async function(formData){
      if(formData === undefined || formData.id === undefined || formData.oldPassword === undefined || formData.newPassword === undefined || formData.newPasswordAgain === undefined ){
          throw new RouteError("Admin ID And New Password Is Required")
        }
      return "success"
    }


    return {
        admins: { login: mockLogin, getAccessToken: mockgetAccessToken, readOne:mockgetReadOne, patchName: mockPatchName, patchPassword:mockPatchPassword },
        forgotPassword: { send: mockSendForgetPasssword, reset:mockReset},
        invitation: { send: mockSendInvitation, accept: mockAccept },
      }
  }

  beforeEach(() => {
    const pinia = createPinia().use(currentUserStore)
    app.use(pinia)
    setActivePinia(createPinia())
  })

  test('test success login', async () => {

    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.login("user1@gmail.com", "12123password")
    const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
    expect(userStore.user).toEqual({ name: "user1", email: "user1@gmail.com", _id:"12test12" })
    expect(userStore.accessToken).toEqual(token)

  })

  test('test login error invalid ', async () => {

    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.login()
    const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
    expect(res.message).toEqual("Admin Email And Password Is Required")
    expect(userStore.user).toEqual(null)
    expect(userStore.accessToken).toEqual(null)

  })

  test('test logOut', async () => {
    localStorage.setItem("accessToken", "Token")
    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    userStore.accessToken = "token";
    userStore.user = {name: "test"};
    const res = await userStore.logout()
    expect(userStore.user).toEqual(null)
    expect(userStore.accessToken).toEqual(null)
  })

  test('test success send forgot Password', async () => {
    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.sendForgotPassword("user1@gmail.com")
    expect(res).toEqual("success")
  })

  test('test send forgot Password fail email required ', async () => {
    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.sendForgotPassword()
    expect(res.message).toEqual("Email Is Required")

  })


  test('test success reset forgot Password', async () => {
    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.resetForgotPassword("forgotPasswordToken", "newPassword", "newPassword")
    const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
    expect(res).toEqual("success")
    expect(userStore.user).toEqual({ name: "user1", email: "user1@gmail.com", _id:"12test12" })
    expect(userStore.accessToken).toEqual(token)

  })

  test('test reset forgot Password fail password is required', async () => {
    const currentUser = currentUserStore(mokeConnector())
    const userStore = currentUser();
    const res = await userStore.resetForgotPassword("forgotPasswordToken", "newPassword")
    expect(res.message).toEqual("Admin Password Is Required")
  })
/*-------------------------------------------------------*/


test('test success send admin Invitation', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.sendInvitation("user1@gmail.com")
  expect(res).toEqual("success")
})

test('test send admin Invitation fail email required ', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.sendInvitation()
  expect(res.message).toEqual("Email Is Required")

})


test('test success accept invitation', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.acceptInvitation("acceptInvitationToken", "newPassword", "newPassword")
  const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
  expect(res).toEqual("success")
  expect(userStore.user).toEqual({ name: "user1", email: "user1@gmail.com", _id:"12test12" })
  expect(userStore.accessToken).toEqual(token)

})

test('test accept invitation fail password is required', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.acceptInvitation("acceptInvitationToken", "newPassword")
  expect(res.message).toEqual("Admin Password Is Required")
})

test('test success refresh Access Token', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  userStore.user= { _id: "12test12"}
  const res = await userStore.refreshAccessToken()
  const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
  expect(userStore.accessToken).toEqual(token)

})

test('test refresh Access Token fail user id required', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.refreshAccessToken()
  const token = jwt.sign({ type: 'admin', user: { _id: "12test12", email:"user1@gmail.com" } }, secrets)
  expect(res.message).toEqual("Admin ID Is Required")

})


test('test success patchName', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  userStore.user = {_id:"12test12",name:"user1"}
  const res = await userStore.patchName("user2")
  expect(res).toEqual("success")
  expect(userStore.user.name).toEqual("user2")

})

test('test patchName fail admin id required ', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.patchName("user2")
  expect(res.message).toEqual("Admin ID Is Required")
})

test('test patchName fail admin new name required ', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  userStore.user = {_id:"12test12",name:"user1"}
  const res = await userStore.patchName()
  expect(res.message).toEqual("Admin ID And New Name Is Required")
})


test('test success patchPassword', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  userStore.user = {_id:"12test12"}
  const res = await userStore.patchPassword("oldPassword", "newPassword", "newPassword")
  expect(res).toEqual("success")

})

test('test patchPassword fail admin id required ', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
  const res = await userStore.patchPassword("oldPassword", "newPassword")
  expect(res.message).toEqual("Admin ID Is Required")
})


test('test patchPassword fail admin password required ', async () => {
  const currentUser = currentUserStore(mokeConnector())
  const userStore = currentUser();
    userStore.user = {_id:"12test12"}
  const res = await userStore.patchPassword("oldPassword", "newPassword")
  expect(res.message).toEqual("Admin ID And New Password Is Required")
})


})



//#### test success patchPassword
//pass passwords
// mock connector func that return {result:{success:true}}
