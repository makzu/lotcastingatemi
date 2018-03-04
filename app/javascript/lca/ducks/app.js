export const CLOSE_DRAWER = 'lca/app/CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME  = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: 'light',
}

export default function AppReducer(state = defaultState, action) {
  switch(action.type) {

  case CLOSE_DRAWER:
    return { ...state,
      drawerOpen: false,
    }

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

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const closeDrawer  = () => ({ type: CLOSE_DRAWER  })
export const switchTheme  = () => ({ type: SWITCH_THEME  })
