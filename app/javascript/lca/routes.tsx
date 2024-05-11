import { Suspense, lazy } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import Placeholder from '@/components/generic/Placeholder'
import WelcomePage from '@/components/pages/WelcomePage'
import PrivacyPage from '@/components/pages/PrivacyPage'
import GoodbyePage from '@/components/pages/GoodbyePage'
import SettingsPage from '@/features/SettingsPage'
// import Test from '@/components/pages/Test'

const ChronicleWrapper = lazy(
  () => import('components/chronicles/ChronicleWrapper'),
)
const CharacterList = lazy(() => import('components/CharacterList/'))
const QcList = lazy(() => import('components/qcs/QcList'))
const BattlegroupList = lazy(
  () => import('components/battlegroups/BattlegroupList'),
)
const CharacterSheetWrap = lazy(() => import('components/CharacterSheet/'))
const CharacterEditor = lazy(
  () => import('components/characterEditor/CharacterEditorWrapper'),
)
const CharmEditor = lazy(
  () => import('components/characters/charms/CharmEditor'),
)
const QcSheet = lazy(() => import('components/qcs/index'))
const QcEditor = lazy(() => import('components/qcs/editor'))
const BattlegroupSheet = lazy(() => import('components/battlegroups/index'))
const BattlegroupEditor = lazy(() => import('components/battlegroups/editor'))
const ResourcesPage = lazy(() => import('components/pages/ResourcesPage'))
const HelpPage = lazy(() => import('components/pages/Help'))

const NewBattlegroupSheet = lazy(() => import('@/features/battlegroup/sheet'))
const NewBattlegroupEditor = lazy(() => import('@/features/battlegroup/editor'))

export default function Routes() {
  return (
    <Suspense fallback={<Placeholder />}>
      <Switch>
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/deleted" element={<GoodbyePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route path="/help/:doc" element={<HelpPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route path="/chronicles/:id/*" element={<ChronicleWrapper />} />

        <Route path="/characters/:id/edit/charms" element={<CharmEditor />} />

        <Route path="/characters/:id/edit/*" element={<CharacterEditor />} />

        <Route path="/characters/:id/*" element={<CharacterSheetWrap />} />

        <Route path="/qcs/:id/edit" element={<QcEditor />} />
        <Route path="/qcs/:id" element={<QcSheet />} />

        <Route path="/battlegroups/:id/edit" element={<BattlegroupEditor />} />
        <Route path="/battlegroups/:id" element={<BattlegroupSheet />} />

        <Route path="/characters" element={<CharacterList />} />
        <Route path="/qcs" element={<QcList />} />
        <Route path="/battlegroups" element={<BattlegroupList />} />

        <Route path="/new-battlegroups/:id" element={<NewBattlegroupSheet />} />
        <Route
          path="/new-battlegroups/:id/edit"
          element={<NewBattlegroupEditor />}
        />

        <Route path="/" element={<WelcomePage />} />
      </Switch>
    </Suspense>
  )
}
