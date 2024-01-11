import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import Placeholder from 'components/generic/Placeholder'
import WelcomePage from 'components/pages/WelcomePage'
import PrivacyPage from 'components/pages/PrivacyPage'
import GoodbyePage from 'components/pages/GoodbyePage'
import SettingsPage from 'components/pages/SettingsPage'

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
const BattlegroupEditor = lazy(
  () => import('components/battlegroups/editor'),
)
const ResourcesPage = lazy(() => import('components/pages/ResourcesPage'))
const HelpPage = lazy(() => import('components/pages/Help'))

export default function Routes() {
  return (
    <Suspense fallback={<Placeholder />}>
      <Switch>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/deleted" component={GoodbyePage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/privacy" component={PrivacyPage} />

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
