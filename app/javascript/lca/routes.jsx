// @flow
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import Placeholder from 'components/generic/Placeholder.jsx'

import WelcomePage from 'components/pages/WelcomePage'
import PrivacyPage from 'components/pages/PrivacyPage.jsx'
import GoodbyePage from 'components/pages/GoodbyePage.jsx'
import SettingsPage from 'components/pages/SettingsPage.jsx'

const ChronicleWrapper = lazy(() =>
  import(
    'components/chronicles/ChronicleWrapper.jsx' /* webpackChunkName: 'Chronicle' */
  ),
)

const ContentList = lazy(() =>
  import('components/pages/contentList.jsx' /* webpackChunkName: 'ListPage' */),
)
const CharacterList = lazy(() =>
  import('components/CharacterList/' /* webpackChunkName: 'ListPage' */),
)
const QcList = lazy(() =>
  import('components/qcs/QcList' /* webpackChunkName: 'ListPage' */),
)
const BattlegroupList = lazy(() =>
  import(
    'components/battlegroups/BattlegroupList' /* webpackChunkName: 'ListPage'*/
  ),
)

const CharacterSheetWrap = lazy(() =>
  import(
    'components/CharacterSheet/' /* webpackPrefetch: 10, webpackChunkName: 'CharacterSheet' */
  ),
)

const CharacterEditor = lazy(() =>
  import(
    'components/characterEditor/CharacterEditorWrapper.jsx' /* webpackChunkName: 'CharacterEditor' */
  ),
)

const CharmEditor = lazy(() =>
  import(
    'components/characters/charms/CharmEditor.jsx' /* webpackChunkName: 'CharmEditor' */
  ),
)

const QcSheet = lazy(() =>
  import('components/qcs/index.jsx' /* webpackChunkName: 'QcSheet' */),
)

const QcEditor = lazy(() =>
  import('components/qcs/editor.jsx' /* webpackChunkName: 'QcBgEditor' */),
)

const BattlegroupSheet = lazy(() =>
  import('components/battlegroups/index.jsx' /* webpackChunkName: 'BgSheet' */),
)

const BattlegroupEditor = lazy(() =>
  import(
    'components/battlegroups/editor.jsx' /* webpackChunkName: 'QcBgEditor' */
  ),
)

const ResourcesPage = lazy(() =>
  import(
    'components/pages/ResourcesPage' /* webpackChunkName: 'ResourcesPage' */
  ),
)

const HelpPage = lazy(() =>
  import('components/pages/Help.jsx' /* webpackChunkName: 'Help' */),
)

export default function Routes() {
  return (
    <Suspense fallback={<Placeholder />}>
      <Switch>
        <Route path="/settings">
          <SettingsPage />
        </Route>

        <Route path="/deleted">
          <GoodbyePage />
        </Route>

        <Route path="/resources">
          <ResourcesPage />
        </Route>

        <Route path="/privacy">
          <PrivacyPage />
        </Route>

        <Route path="/content">
          <ContentList />
        </Route>

        <Route path="/help/:doc.:ext?">
          <HelpPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/chronicles/:id">
          <ChronicleWrapper />
        </Route>

        <Route path="/characters/:id/edit/charms">
          <CharmEditor />
        </Route>
        <Route path="/characters/:id/edit">
          <CharacterEditor />
        </Route>
        <Route path="/characters/:id/">
          <CharacterSheetWrap />
        </Route>

        <Route path="/qcs/:id/edit">
          <QcEditor />
        </Route>
        <Route path="/qcs/:id">
          <QcSheet />
        </Route>

        <Route path="/battlegroups/:id/edit">
          <BattlegroupEditor />
        </Route>
        <Route path="/battlegroups/:id">
          <BattlegroupSheet />
        </Route>

        <Route path="/characters">
          <CharacterList />
        </Route>
        <Route path="/qcs">
          <QcList />
        </Route>
        <Route path="/battlegroups">
          <BattlegroupList />
        </Route>

        <Route path="/">
          <WelcomePage />
        </Route>
      </Switch>
    </Suspense>
  )
}
