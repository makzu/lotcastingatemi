import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useDocumentTitle } from 'hooks'
import Routes from '../routes'
import App from './App'
import ThemeContainer from './ThemeContainer'
import { GlobalHistory } from './GlobalNavigate'

export const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <App>
        <GlobalHistory />
        <Routes />
      </App>
    ),
  },
])

interface Props {
  store: any
}

const RootContainer = ({ store }: Props) => {
  useDocumentTitle('Lot-Casting Atemi')
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeContainer>
          <RouterProvider router={router} />
        </ThemeContainer>
      </Provider>
    </StrictMode>
  )
}

export default RootContainer
