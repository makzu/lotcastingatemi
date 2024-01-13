import { Component } from 'react'

import Typography from '@mui/material/Typography'

import Editor from 'components/generic/intimacyEditor'
import BlockPaper from 'components/shared/BlockPaper'
import type { withIntimacies as Character } from 'utils/flow-types'

interface Props {
  character: Character
  onChange: Function
}

class IntimacyEditor extends Component<Props> {
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
