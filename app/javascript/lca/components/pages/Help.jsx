// @flow
import { useParams } from 'react-router-dom'

import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'

import FormsDoc from 'Docs/forms.md'
import MeritsDoc from 'Docs/merits.md'
import IndexDoc from 'Docs/README.md'
import WeaponsDoc from 'Docs/weapons.md'

const HelpPage = () => {
  let { doc } = useParams()
  let md

  doc = doc?.replace('.md', '')

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
    <BlockPaper>
      <MarkdownDisplay source={md} />
    </BlockPaper>
  )
}

export default HelpPage
