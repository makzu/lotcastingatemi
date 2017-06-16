import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'
import { responsiveDrawer } from 'material-ui-responsive-drawer'

import EntityReducer from './entities'
import SessionReducer from './account.js'

const lcaApp = combineReducers({
  browser:          responsiveStateReducer,
  entities:         EntityReducer,
  responsiveDrawer: responsiveDrawer,
  session:          SessionReducer,
})

export default lcaApp
