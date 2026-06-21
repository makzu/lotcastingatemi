import React from 'react'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import Editor from '@lca/components/generic/IntimacyEditor.tsx'
import type { Character } from '@lca/types/character.ts'

type Props = {
  character: Character
  onChange: Function
}

class IntimacyEditor extends React.Component<Props> {
  render() {
    const { character, onChange } = this.props

    return (
      <BlockPaper>
        <Typography variant="h6">Intimacies</Typography>

        <Editor
          character={character}
          characterType="character"
          onChange={onChange}
        />
      </BlockPaper>
    )
  }
}

export default IntimacyEditor
