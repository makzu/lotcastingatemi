// @flow
import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import HelpPage from 'components/pages/Help.jsx'

// import ChronicleWrapper from 'components/chronicles/ChronicleWrapper.jsx'
const ChronicleWrapper = lazy(() =>
  import('components/chronicles/ChronicleWrapper.jsx')
)
// import ContentList from 'components/pages/contentList.jsx'
const ContentList = lazy(() =>
  import('components/pages/contentList.jsx' /* webpackChunkName: 'ListPage' */)
)
import GoodbyePage from 'components/pages/GoodbyePage.jsx'
// const GoodbyePage = lazy(() =>
//   import('components/pages/GoodbyePage.jsx' /* webpackChunkName: 'GoodbyePage' */)
// )
// import SettingsPage from 'components/pages/SettingsPage.jsx'
const SettingsPage = lazy(() =>
  import('components/pages/SettingsPage.jsx' /* webpackChunkName: 'SettingsPage' */)
)
// import CharacterSheet from 'components/characters/index.jsx'
const CharacterSheet = lazy(() =>
  import('components/characters/index.jsx' /* webpackChunkName: 'CharacterSheet' */)
)
import CharacterDashboard from 'components/characters/dashboard/'
// import MeritFullPage from 'components/characters/MeritFullPage.jsx'
const MeritFullPage = lazy(() =>
  import('components/characters/MeritFullPage.jsx' /* webpackChunkName: 'MeritPage' */)
)
// import CharmFullPage from 'components/characters/charms/index.jsx'
const CharmFullPage = lazy(() =>
  import('components/characters/charms/index.jsx' /* webpackChunkName: 'CharmPage' */)
)
// import BioFullPage from 'components/characters/BioFullPage.jsx'
const BioFullPage = lazy(() =>
  import('components/characters/BioFullPage.jsx' /* webpackChunkName: 'BioPage' */)
)
// import CharacterEditor from 'components/characterEditor/index.jsx'
const CharacterEditor = lazy(() =>
  import('components/characterEditor/index.jsx' /* webpackChunkName: 'CharacterEditor' */)
)
// import MeritEditor from 'components/characterEditor/merits/MeritEditor.jsx'
const MeritEditor = lazy(() =>
  import('components/characterEditor/merits/MeritEditor.jsx' /* webpackChunkName: 'MeritEditor' */)
)
// import CharmEditor from 'components/characters/charms/CharmEditor.jsx'
const CharmEditor = lazy(() =>
  import('components/characters/charms/CharmEditor.jsx' /* webpackChunkName: 'CharmEditor' */)
)
// import BioEditor from 'components/characterEditor/bio.jsx'
const BioEditor = lazy(() =>
  import('components/characterEditor/bio.jsx' /* webpackChunkName: 'BioEditor' */)
)
// import QcSheet from 'components/qcs/index.jsx'
const QcSheet = lazy(() =>
  import('components/qcs/index.jsx' /* webpackChunkName: 'QcSheet' */)
)
// import QcEditor from 'components/qcs/editor.jsx'
const QcEditor = lazy(() =>
  import('components/qcs/editor.jsx' /* webpackChunkName: 'QcEditor' */)
)
// import BattlegroupSheet from 'components/battlegroups/index.jsx'
const BattlegroupSheet = lazy(() =>
  import('components/battlegroups/index.jsx' /* webpackChunkName: 'BgSheet' */)
)
// import BattlegroupEditor from 'components/battlegroups/editor.jsx'
const BattlegroupEditor = lazy(() =>
  import('components/battlegroups/editor.jsx' /* webpackChunkName: 'BgEditor' */)
)
import WelcomePage from 'components/pages/welcomePage.jsx'
import ResourcesPage from 'components/pages/resourcesPage.jsx'
// const ResourcesPage = lazy(() =>
//   import('components/pages/resourcesPage.jsx' /* webpackChunkName: 'Resources' */)
// )
import PrivacyPage from 'components/pages/PrivacyPage.jsx'
// const PrivacyPage = lazy(() =>
//   import('components/pages/PrivacyPage.jsx' /* webpackChunkName: 'Privacy' */)
// )

export default function Routes() {
  return (
    <Switch>
      <Suspense fallback={'Loading...'}>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/deleted" component={GoodbyePage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/content" component={ContentList} />

        <Route path="/help/:doc.:ext?" component={HelpPage} />
        <Route path="/help" component={HelpPage} />

        <Route path="/chronicles/:chronicleId" component={ChronicleWrapper} />

        <Route
          path="/characters/:characterId/edit/merits"
          component={MeritEditor}
        />
        <Route
          path="/characters/:characterId/edit/charms"
          component={CharmEditor}
        />
        <Route path="/characters/:characterId/edit/bio" component={BioEditor} />
        <Route
          path="/characters/:characterId/edit"
          component={CharacterEditor}
        />

        <Route
          path="/characters/:characterId/dashboard"
          component={CharacterDashboard}
        />
        <Route
          path="/characters/:characterId/merits"
          component={MeritFullPage}
        />
        <Route
          path="/characters/:characterId/charms"
          component={CharmFullPage}
        />
        <Route path="/characters/:characterId/bio" component={BioFullPage} />
        <Route path="/characters/:characterId" component={CharacterSheet} />

        <Route path="/qcs/:qcId/edit" component={QcEditor} />
        <Route path="/qcs/:qcId" component={QcSheet} />

        <Route
          path="/battlegroups/:battlegroupId/edit"
          component={BattlegroupEditor}
        />
        <Route path="/battlegroups/:bgId" component={BattlegroupSheet} />
      </Suspense>
    </Switch>
  )
}
