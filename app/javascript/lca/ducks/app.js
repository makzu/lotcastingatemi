export const TOGGLE_DRAWER =         'lca/app/TOGGLE_DRAWER'

const defaultState = {
  drawerOpen: false,
}

export default function AppReducer(state = defaultState, action) {
  switch(action.type) {

  case TOGGLE_DRAWER:
    return { ...state,
      drawerOpen: !state.drawerOpen,
    }

  default:
    return state
  }
}

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER }
}
