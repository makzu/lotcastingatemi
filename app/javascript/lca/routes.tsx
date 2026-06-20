import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import Placeholder from 'components/generic/Placeholder.tsx'
import GoodbyePage from 'components/pages/GoodbyePage.tsx'
import PrivacyPage from 'components/pages/PrivacyPage.tsx'
import SettingsPage from 'components/pages/SettingsPage.tsx'
import WelcomePage from 'components/pages/WelcomePage.tsx'

const ChronicleWrapper = lazy(
  () => import('components/chronicles/ChronicleWrapper.tsx'),
)

const ContentList = lazy(() => import('components/pages/ContentList.tsx'))
const CharacterList = lazy(() => import('components/CharacterList/'))
const QcList = lazy(() => import('components/qcs/QcList.tsx'))
const BattlegroupList = lazy(
  () => import('components/battlegroups/BattlegroupList.tsx'),
)

const CharacterSheetWrap = lazy(() => import('components/CharacterSheet/'))

const CharacterEditor = lazy(
  () => import('components/characterEditor/CharacterEditorWrapper.tsx'),
)

const QcSheet = lazy(() => import('components/qcs/index.tsx'))

const QcEditor = lazy(() => import('components/qcs/editor.tsx'))

const BattlegroupSheet = lazy(() => import('components/battlegroups/index.tsx'))

const BattlegroupEditor = lazy(
  () => import('components/battlegroups/editor.tsx'),
)

const ResourcesPage = lazy(() => import('components/pages/ResourcesPage'))

const HelpPage = lazy(() => import('components/pages/Help.tsx'))

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
