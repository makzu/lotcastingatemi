// @flow
import React from 'react'
import { Redirect, Route } from 'react-router'

import BlockPaper from 'components/generic/blockPaper.jsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'

import IndexDoc from 'Docs/README.md'
import WeaponsDoc from 'Docs/weapons.md'
import MeritsDoc from 'Docs/merits.md'

type Props = {
  match: { params: { doc: string } },
  classes: Object,
}

const HelpPage = ({ match }: Props) => {
  let doc
  switch (match.params.doc) {
    case 'merits':
      doc = MeritsDoc
      break
    case 'weapons':
      doc = WeaponsDoc
      break
    default:
      doc = IndexDoc
  }

  return (
    <>
      <Route exact path="/help" render={() => <Redirect to="/help/index" />} />

      <BlockPaper>
        <MarkdownDisplay source={doc} />
      </BlockPaper>
    </>
  )
}

export default HelpPage
