import { useParams } from 'react-router-dom'

import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'

import IndexDoc from 'Docs/README.md?raw'
import WeaponsDoc from 'Docs/weapons.md?raw'
import MeritsDoc from 'Docs/merits.md?raw'
import FormsDoc from 'Docs/forms.md?raw'

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
