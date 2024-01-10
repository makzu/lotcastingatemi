import React from 'react'
import { Redirect, Route } from 'react-router'
import BlockPaper from 'components/generic/blockPaper.jsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import IndexDoc from 'Docs/README.md?raw'
import WeaponsDoc from 'Docs/weapons.md?raw'
import MeritsDoc from 'Docs/merits.md?raw'
import FormsDoc from 'Docs/forms.md?raw'
interface Props {
  match: {
    params: {
      doc: string
    }
  }
  classes: Record<string, $TSFixMe>
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
