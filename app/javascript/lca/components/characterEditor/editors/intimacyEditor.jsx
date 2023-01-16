// @flow
import { Component } from 'react'
import { shouldUpdate } from 'recompose'

import Typography from '@mui/material/Typography'

import Editor from 'components/generic/intimacyEditor.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import { isUnequalByKeys } from 'utils'
import type { withIntimacies as Character, Enhancer } from 'utils/flow-types'

type Props = {
  character: Character,
  onChange: Function,
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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'principles',
      'ties',
    ]),
)

export default enhance(IntimacyEditor)
