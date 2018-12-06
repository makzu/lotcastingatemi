// @flow
import React from 'react'
import { Route } from 'react-router-dom'

import ChronicleWrapper from 'components/chronicles/ChronicleWrapper.jsx'
import ContentList from 'components/pages/contentList.jsx'
import GoodbyePage from 'components/pages/GoodbyePage.jsx'
import SettingsPage from 'components/pages/SettingsPage.jsx'
import CharacterSheet from 'components/characters/index.jsx'
import CharacterDashboard from 'components/characters/dashboard/'
import MeritFullPage from 'components/characters/MeritFullPage.jsx'
import CharmFullPage from 'components/characters/charms/index.jsx'
import BioFullPage from 'components/characters/BioFullPage.jsx'
import CharacterEditor from 'components/characterEditor/index.jsx'
import MeritEditor from 'components/characterEditor/merits/MeritEditor.jsx'
import CharmEditor from 'components/characters/charms/CharmEditor.jsx'
import BioEditor from 'components/characterEditor/bio.jsx'
import QcSheet from 'components/qcs/index.jsx'
import QcEditor from 'components/qcs/editor.jsx'
import BattlegroupSheet from 'components/battlegroups/index.jsx'
import BattlegroupEditor from 'components/battlegroups/editor.jsx'
import WelcomePage from 'components/pages/welcomePage.jsx'
import ResourcesPage from 'components/pages/resourcesPage.jsx'
import PrivacyPage from 'components/pages/PrivacyPage.jsx'

export default function Routes() {
  return (
    <>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/deleted" component={GoodbyePage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/content" component={ContentList} />

      <Route path="/chronicles/:chronicleId" component={ChronicleWrapper} />

      <Route exact path="/characters/:characterId" component={CharacterSheet} />
      <Route
        path="/characters/:characterId/dashboard"
        component={CharacterDashboard}
      />
      <Route path="/characters/:characterId/merits" component={MeritFullPage} />
      <Route path="/characters/:characterId/charms" component={CharmFullPage} />
      <Route path="/characters/:characterId/bio" component={BioFullPage} />

      <Route
        exact
        path="/characters/:characterId/edit"
        component={CharacterEditor}
      />
      <Route
        path="/characters/:characterId/edit/merits"
        component={MeritEditor}
      />
      <Route
        path="/characters/:characterId/edit/charms"
        component={CharmEditor}
      />
      <Route path="/characters/:characterId/edit/bio" component={BioEditor} />

      <Route exact path="/qcs/:qcId" component={QcSheet} />
      <Route path="/qcs/:qcId/edit" component={QcEditor} />

      <Route exact path="/battlegroups/:bgId" component={BattlegroupSheet} />
      <Route
        path="/battlegroups/:battlegroupId/edit"
        component={BattlegroupEditor}
      />
    </>
  )
}
