import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import { withIntimacies } from '../../../utils/propTypes'

import BlockPaper from '../../generic/blockPaper.jsx'
import Editor from '../../generic/intimacyEditor.jsx'

class IntimacyEditor extends Component {
  render() {
    const { character, onRatingChange } = this.props

    return <BlockPaper>
      <Typography variant="title">
        Intimacies
      </Typography>

      <Editor character={ character } characterType="character"
        onChange={ onRatingChange }
      />
    </BlockPaper>
  }
}
IntimacyEditor.propTypes = {
  character: PropTypes.shape(withIntimacies).isRequired,
  onRatingChange: PropTypes.func
}

export default IntimacyEditor
