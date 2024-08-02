import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CharacterSheetWrap from '@/components/CharacterSheet'
import Placeholder from '@/components/generic/Placeholder'
import GoodbyePage from '@/components/pages/GoodbyePage'
import HelpPage from '@/components/pages/Help'
import PrivacyPage from '@/components/pages/PrivacyPage'
import ResourcesPage from '@/components/pages/ResourcesPage'
import WelcomePage from '@/components/pages/WelcomePage'
import NewBattlegroupSheet from '@/features/battlegroup/sheet'
import QcSheet from '@/features/qc/sheet'
import SettingsPage from '@/features/SettingsPage'
import { useDocumentTitle } from '@/hooks'
import App from './App'
import ThemeContainer from './ThemeContainer'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'deleted', element: <GoodbyePage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'help/:doc?', element: <HelpPage /> },
      {
        path: 'characters',
        async lazy() {
          const CharacterList = await import('@/components/CharacterList')
          return { Component: CharacterList.default }
        },
      },
      // { path: 'characters/:id', element: <CharacterSheetWrap /> },
      // {
      //   path: 'characters/:id/edit/*',
      //   async lazy() {
      //     const Editor = await import(
      //       '@/components/characterEditor/CharacterEditorWrapper'
      //     )
      //     return { Component: Editor.default }
      //   },
      // },
      {
        path: 'qcs',
        async lazy() {
          const ListPage = await import('@/features/qc/list')
          return { Component: ListPage.default }
        },
      },
      { path: 'qcs/:id', element: <QcSheet /> },
      {
        path: 'qcs/:id/edit',
        async lazy() {
          const Editor = await import('@/features/qc/editor')
          return { Component: Editor.default }
        },
      },
      {
        path: 'battlegroups',
        async lazy() {
          const ListPage = await import('@/features/battlegroup/list')
          return { Component: ListPage.default }
        },
      },
      { path: 'battlegroups/:id', element: <NewBattlegroupSheet /> },
      {
        path: 'battlegroups/:id/edit',
        async lazy() {
          const Editor = await import('@/features/battlegroup/editor')
          return { Component: Editor.default }
        },
      },
      {
        path: 'chronicles/:id',
        async lazy() {
          const Wrapper = await import(
            '@/components/chronicles/ChronicleWrapper'
          )
          return { Component: Wrapper.default }
        },
      },
    ],
  },
])

const RootContainer = () => {
  useDocumentTitle('Lot-Casting Atemi')

  return (
    <ThemeContainer>
      <RouterProvider router={router} fallbackElement={<Placeholder />} />
    </ThemeContainer>
  )
}

export default RootContainer
