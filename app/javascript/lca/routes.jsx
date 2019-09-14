// @flow
import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import Placeholder from 'components/generic/Placeholder.jsx'

import WelcomePage from 'components/pages/welcomePage.jsx'
import PrivacyPage from 'components/pages/PrivacyPage.jsx'
import GoodbyePage from 'components/pages/GoodbyePage.jsx'
import SettingsPage from 'components/pages/SettingsPage.jsx'

const ChronicleWrapper = lazy(() =>
  import(
    'components/chronicles/ChronicleWrapper.jsx' /* webpackChunkName: 'Chronicle' */
  )
)

const ContentList = lazy(() =>
  import('components/pages/contentList.jsx' /* webpackChunkName: 'ListPage' */)
)
const CharacterList = lazy(() =>
  import('components/CharacterList/' /* webpackChunkName: 'ListPage' */)
)
const QcList = lazy(() =>
  import('components/qcs/QcList' /* webpackChunkName: 'ListPage' */)
)
const BattlegroupList = lazy(() =>
  import(
    'components/battlegroups/BattlegroupList' /* webpackChunkName: 'ListPage'*/
  )
)

const CharacterSheetWrap = lazy(() =>
  import(
    'components/CharacterSheet/' /* webpackPrefetch: 10, webpackChunkName: 'CharacterSheet' */
  )
)

const CharacterEditor = lazy(() =>
  import(
    'components/characterEditor/CharacterEditorWrapper.jsx' /* webpackChunkName: 'CharacterEditor' */
  )
)

const CharmEditor = lazy(() =>
  import(
    'components/characters/charms/CharmEditor.jsx' /* webpackChunkName: 'CharmEditor' */
  )
)

const QcSheet = lazy(() =>
  import('components/qcs/index.jsx' /* webpackChunkName: 'QcSheet' */)
)

const QcEditor = lazy(() =>
  import('components/qcs/editor.jsx' /* webpackChunkName: 'QcBgEditor' */)
)

const BattlegroupSheet = lazy(() =>
  import('components/battlegroups/index.jsx' /* webpackChunkName: 'BgSheet' */)
)

const BattlegroupEditor = lazy(() =>
  import(
    'components/battlegroups/editor.jsx' /* webpackChunkName: 'QcBgEditor' */
  )
)

const ResourcesPage = lazy(() =>
  import(
    'components/pages/resourcesPage.jsx' /* webpackChunkName: 'ResourcesPage' */
  )
)

const HelpPage = lazy(() =>
  import('components/pages/Help.jsx' /* webpackChunkName: 'Help' */)
)

export default function Routes() {
  return (
    <Suspense fallback={<Placeholder />}>
      <Switch>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/deleted" component={GoodbyePage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/content" component={ContentList} />

        <Route path="/help/:doc.:ext?" component={HelpPage} />
        <Route path="/help" component={HelpPage} />

        <Route path="/chronicles/:chronicleId" component={ChronicleWrapper} />

        <Route
          path="/characters/:characterId/edit/charms"
          component={CharmEditor}
        />

        <Route
          path="/characters/:characterId/edit"
          component={CharacterEditor}
        />

        <Route path="/characters/:id/" component={CharacterSheetWrap} />

        <Route path="/qcs/:qcId/edit" component={QcEditor} />
        <Route path="/qcs/:qcId" component={QcSheet} />

        <Route
          path="/battlegroups/:battlegroupId/edit"
          component={BattlegroupEditor}
        />
        <Route path="/battlegroups/:bgId" component={BattlegroupSheet} />

        <Route path="/characters" component={CharacterList} />
        <Route path="/qcs" component={QcList} />
        <Route path="/battlegroups" component={BattlegroupList} />

        <Route path="/" component={WelcomePage} />
      </Switch>
    </Suspense>
  )
}
