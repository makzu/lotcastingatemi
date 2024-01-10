import React from 'react'
import { shouldUpdate } from 'recompose'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper.jsx'
import Editor from 'components/generic/intimacyEditor.jsx'
import { isUnequalByKeys } from 'utils'
import type { withIntimacies as Character, Enhancer } from 'utils/flow-types'
interface Props {
  character: Character
  onChange: $TSFixMeFunction
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
