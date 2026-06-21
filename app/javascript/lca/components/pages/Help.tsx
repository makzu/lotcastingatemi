// @flow
import React from 'react'
import { Redirect, Route } from 'react-router'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import FormsDoc from 'Docs/forms.md?raw'
import MeritsDoc from 'Docs/merits.md?raw'
import IndexDoc from 'Docs/README.md?raw'
import WeaponsDoc from 'Docs/weapons.md?raw'

type Props = {
  match: { params: { doc: string } }
  classes: Object
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
    case 'forms':
      doc = FormsDoc
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
