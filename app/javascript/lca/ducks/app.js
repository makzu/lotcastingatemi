export const CLOSE_DRAWER = 'lca/app/CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME  = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: localStorage.theme || 'light',
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
      theme: action.theme,
    }

  default:
    return state
  }
}

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const closeDrawer  = () => ({ type: CLOSE_DRAWER  })
export const switchTheme  = (theme) => ({ type: SWITCH_THEME, theme: theme  })
