import {Actions, remoteUrl as URL} from '../../Constant'
import Fetch from '../../Component/Login/Fetch'

export function setUser (user) {
  return {
    type: Actions.SET_USER,
    user
  }
}

export function logout () {
  Fetch.post(URL.LOGOUT)
  return {
    type: Actions.LOGOUT
  }
}
