// @flow
import { Redirect, Route, useParams } from 'react-router'

import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'

import IndexDoc from 'Docs/README.md'
import WeaponsDoc from 'Docs/weapons.md'
import MeritsDoc from 'Docs/merits.md'
import FormsDoc from 'Docs/forms.md'

const HelpPage = () => {
  const { doc } = useParams()
  let md
  switch (doc) {
    case 'merits':
      md = MeritsDoc
      break
    case 'weapons':
      md = WeaponsDoc
      break
    case 'forms':
      md = FormsDoc
      break
    default:
      md = IndexDoc
  }

  return (
    <>
      <Route exact path="/help">
        {() => <Redirect to="/help/index" />}
      </Route>

      <BlockPaper>
        <MarkdownDisplay source={md} />
      </BlockPaper>
    </>
  )
}

export default HelpPage
