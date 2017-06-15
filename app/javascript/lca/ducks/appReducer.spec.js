import { appReducer } from '.'
import { TOGGLE_MENU } from './actions.js'

describe('AppReducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual({
      navDrawerOpen: false,
      isFetching: false,
      isError: false,
      isEditing: false
    })
  })

  it('should handle TOGGLE_MENU', () => {
    expect(appReducer({ navDrawerOpen: false }, { type: TOGGLE_MENU })).toEqual({
      navDrawerOpen: true
    })
    expect(appReducer({ navDrawerOpen: true }, { type: TOGGLE_MENU })).toEqual({
      navDrawerOpen: false
    })
  })
})
