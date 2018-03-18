export const CLOSE_DRAWER = 'lca/app/CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'lca/app/TOGGLE_DRAWER'
export const SWITCH_THEME  = 'lca/app/SWITCH_THEME'

const defaultState = {
  drawerOpen: false,
  theme: localStorage.theme || 'light',
  loading: false,
}

export default function AppReducer(state = defaultState, action) {
  const act = action.type.split('/')
  if (act[0] !== 'lca')
    return state

  switch(act[2]) {
  case 'CREATE':
  case 'FETCH':
  case 'UPDATE':
  case 'DESTROY':
    return { ...state,
      loading: true,
    }

  case 'CREATE_SUCCESS':
  case 'FETCH_SUCCESS':
  case 'UPDATE_SUCCESS':
  case 'DESTROY_SUCCESS':
  case 'CREATE_FAILURE':
  case 'FETCH_FAILURE':
  case 'UPDATE_FAILURE':
  case 'DESTROY_FAILURE':
    return { ...state,
      loading: false,
    }
  }

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
