export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME  = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: 'light',
}

export default function AppReducer(state = defaultState, action) {
  switch(action.type) {

  case TOGGLE_DRAWER:
    return { ...state,
      drawerOpen: !state.drawerOpen,
    }

  case SWITCH_THEME:
    return { ...state,
      theme: state.theme == 'light' ? 'dark' : 'light'
    }

  default:
    return state
  }
}

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER }
}

export function switchTheme() {
  return { type: SWITCH_THEME }
}
