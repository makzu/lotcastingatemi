import { Suspense, lazy } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import Placeholder from 'components/generic/Placeholder.jsx'

import WelcomePage from 'components/pages/WelcomePage'
import PrivacyPage from 'components/pages/PrivacyPage.jsx'
import GoodbyePage from 'components/pages/GoodbyePage.jsx'
import SettingsPage from 'components/pages/SettingsPage.jsx'

const ChronicleWrapper = lazy(
  () =>
    import(
      'components/chronicles/ChronicleWrapper.jsx' /* webpackChunkName: 'Chronicle' */
    ),
)

const ContentList = lazy(
  () =>
    import(
      'components/pages/contentList.jsx' /* webpackChunkName: 'ListPage' */
    ),
)
const CharacterList = lazy(
  () => import('components/CharacterList/' /* webpackChunkName: 'ListPage' */),
)
const QcList = lazy(
  () => import('components/qcs/QcList' /* webpackChunkName: 'ListPage' */),
)
const BattlegroupList = lazy(
  () =>
    import(
      'components/battlegroups/BattlegroupList' /* webpackChunkName: 'ListPage'*/
    ),
)

const CharacterSheetWrap = lazy(
  () =>
    import(
      'components/CharacterSheet/' /* webpackPrefetch: 10, webpackChunkName: 'CharacterSheet' */
    ),
)

const CharacterEditor = lazy(
  () =>
    import(
      'components/characterEditor/CharacterEditorWrapper' /* webpackChunkName: 'CharacterEditor' */
    ),
)

const CharmEditor = lazy(
  () =>
    import(
      'components/characters/charms/CharmEditor.jsx' /* webpackChunkName: 'CharmEditor' */
    ),
)

const QcSheet = lazy(
  () => import('components/qcs/index.jsx' /* webpackChunkName: 'QcSheet' */),
)

const QcEditor = lazy(
  () =>
    import('components/qcs/editor.jsx' /* webpackChunkName: 'QcBgEditor' */),
)

const BattlegroupSheet = lazy(
  () =>
    import(
      'components/battlegroups/index.jsx' /* webpackChunkName: 'BgSheet' */
    ),
)

const BattlegroupEditor = lazy(
  () =>
    import(
      'components/battlegroups/editor.jsx' /* webpackChunkName: 'QcBgEditor' */
    ),
)

const ResourcesPage = lazy(
  () =>
    import(
      'components/pages/ResourcesPage' /* webpackChunkName: 'ResourcesPage' */
    ),
)

const HelpPage = lazy(
  () => import('components/pages/Help.jsx' /* webpackChunkName: 'Help' */),
)

export default function Routes() {
  return (
    <Suspense fallback={<Placeholder />}>
      <Switch>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/deleted" element={<GoodbyePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route path="/content" element={<ContentList />} />

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

        <Route path="/" element={<WelcomePage />} />
      </Switch>
    </Suspense>
  )
}
