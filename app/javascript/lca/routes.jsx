import React from 'react'
import { Route } from 'react-router-dom'

import ContentList from './components/pages/contentList.jsx'
import CharacterSheet from './components/characters/index.jsx'
import MeritFullPage from './components/characters/MeritFullPage.jsx'
import CharmFullPage from './components/characters/charmFullPage.jsx'
import QcSheet from './components/qcs/index.jsx'
import QcEditor from './components/qcs/editor.jsx'
import BattlegroupSheet from './components/battlegroups/index.jsx'
import BattlegroupEditor from './components/battlegroups/editor.jsx'
import WelcomePage from './components/pages/welcomePage.jsx'

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={ ContentList } />
      <Route path="/lca" component={ WelcomePage } />

      <Route exact path="/characters/:characterId" component={ CharacterSheet } />
      <Route path="/characters/:characterId/merits" component={ MeritFullPage } />
      <Route path="/characters/:characterId/charms" component={ CharmFullPage } />

      <Route exact path="/qcs/:qcId" component={ QcSheet } />
      <Route path="/qcs/:qcId/edit" component={ QcEditor } />

      <Route exact path="/battlegroups/:bgId" component={ BattlegroupSheet } />
      <Route path="/battlegroups/:battlegroupId/edit" component={ BattlegroupEditor } />
    </div>
  )
}
