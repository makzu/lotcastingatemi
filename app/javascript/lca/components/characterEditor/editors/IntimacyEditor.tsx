import React from 'react'
import Typography from '@material-ui/core/Typography'
import { shouldUpdate } from 'recompose'

import Editor from '@lca/components/generic/IntimacyEditor.tsx'
import { isUnequalByKeys } from '@lca/utils'
import type {
  withIntimacies as Character,
  Enhancer,
} from '@lca/utils/flow-types'
import BlockPaper from 'components/generic/BlockPaper.tsx'

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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'principles',
      'ties',
    ]),
)

export default enhance(IntimacyEditor)
