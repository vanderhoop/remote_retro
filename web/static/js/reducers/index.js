import { combineReducers } from 'redux'

import idea from './idea'
import user from './user'


const rootReducer = combineReducers({
  idea,
  user,
})

export default rootReducer
