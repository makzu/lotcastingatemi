// @flow
import React, { Component } from 'react'

import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import Editor from 'components/generic/intimacyEditor.jsx'
import type { withIntimacies as Character } from 'utils/flow-types'

type Props = { character: Character, onRatingChange: Function }
class IntimacyEditor extends Component<Props> {
  render() {
    const { character, onRatingChange } = this.props

    return (
      <BlockPaper>
        <Typography variant="title">Intimacies</Typography>

        <Editor
          character={character}
          characterType="character"
          onChange={onRatingChange}
        />
      </BlockPaper>
    )
  }
}

export default IntimacyEditor
