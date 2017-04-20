import { handleActions } from 'redux-actions'
import { setUser } from 'src/Redux/Action'

export const userInfo = handleActions({
  [setUser]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, {});