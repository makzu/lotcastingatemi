import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import Placeholder from '@lca/components/generic/Placeholder.tsx'
import GoodbyePage from '@lca/components/pages/GoodbyePage.tsx'
import PrivacyPage from '@lca/components/pages/PrivacyPage.tsx'
import SettingsPage from '@lca/components/pages/SettingsPage.tsx'
import WelcomePage from '@lca/components/pages/WelcomePage.tsx'

const ChronicleWrapper = lazy(
  () => import('@lca/components/chronicles/ChronicleWrapper.tsx'),
)

const ContentList = lazy(() => import('@lca/components/pages/ContentList.tsx'))
const CharacterList = lazy(() => import('@lca/components/CharacterList/'))
const QcList = lazy(() => import('@lca/components/qcs/QcList.tsx'))
const BattlegroupList = lazy(
  () => import('@lca/components/battlegroups/BattlegroupList.tsx'),
)

const CharacterSheetWrap = lazy(() => import('@lca/components/CharacterSheet/'))

const CharacterEditor = lazy(
  () => import('@lca/components/characterEditor/CharacterEditorWrapper.tsx'),
)

const QcSheet = lazy(() => import('@lca/components/qcs/index.tsx'))

const QcEditor = lazy(() => import('@lca/components/qcs/editor.tsx'))

const BattlegroupSheet = lazy(
  () => import('@lca/components/battlegroups/index.tsx'),
)

const BattlegroupEditor = lazy(
  () => import('@lca/components/battlegroups/editor.tsx'),
)

const ResourcesPage = lazy(() => import('@lca/components/pages/ResourcesPage'))

const HelpPage = lazy(() => import('@lca/components/pages/Help.tsx'))

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
          path="/characters/:characterId/edit"
          component={CharacterEditor}
        />

        <Route path="/characters/:id/" component={CharacterSheetWrap} />

        <Route path="/qcs/:qcId/edit" component={QcEditor} />
        <Route path="/qcs/:qcId" component={QcSheet} />

        <Route path="/battlegroups/:id/edit" component={BattlegroupEditor} />
        <Route path="/battlegroups/:id" component={BattlegroupSheet} />

        <Route path="/characters" component={CharacterList} />
        <Route path="/qcs" component={QcList} />
        <Route path="/battlegroups" component={BattlegroupList} />

        <Route path="/" component={WelcomePage} />
      </Switch>
    </Suspense>
  )
}
