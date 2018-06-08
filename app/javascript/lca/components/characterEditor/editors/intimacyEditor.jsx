// @flow
import React, { Component } from 'react'
import { shouldUpdate } from 'recompose'

import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import Editor from 'components/generic/intimacyEditor.jsx'
import { isUnequalByKeys } from 'utils'
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

export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(props.character, newProps.character, ['principles', 'ties'])
)(IntimacyEditor)
