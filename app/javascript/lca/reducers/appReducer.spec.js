import { appReducer } from '.'
import * as c from '../utils/actionNames'

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
    expect(appReducer({ navDrawerOpen: false },{ type: c.TOGGLE_MENU })).toEqual({
      navDrawerOpen: true
    })
    expect(appReducer({ navDrawerOpen: true },{ type: c.TOGGLE_MENU })).toEqual({
      navDrawerOpen: false
    })
  })
})
