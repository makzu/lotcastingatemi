import React from 'react'
import { IndexRoute, Route, Redirect, Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'

import LcaHeader from  '../components/header.jsx'
import LcaFooter from  '../components/footer.jsx'

import CharacterSheet from '../components/characterSheet/index.jsx'
import QcSheet from    '../components/qcSheet/index.jsx'
import WelcomePage from '../components/welcomePage/index.jsx'

const Wrapper = styled.div`
  padding-left: 280px;
  padding-right: 20px;
  padding-bottom: 20px;
`

export default function RouteContainer(props) {
  return(
    <Paper>
      <LcaHeader />
      <Wrapper className="contentWrapper">
        <Route exact path="/" component={ WelcomePage } />
        <Route path="/characters/:characterId" component={ CharacterSheet } />
        <Route path="/qcs/:qcId" component={ QcSheet } />
      </Wrapper>
    </Paper>
  )
}
