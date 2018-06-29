// @flow
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import sharedStyles from 'styles/'
import { prettyFullExaltType } from 'utils/calculated'

import type { Character } from 'utils/flow-types'

const styles = theme => ({
  ...sharedStyles(theme),
})

type Props = { character: Character, classes: Object }
const BasicsBlock = ({ character, classes }: Props) => (
  <BlockPaper>
    <Typography variant="headline">{character.name}</Typography>

    <Typography variant="subheading">
      Essence {character.essence} {prettyFullExaltType(character)}
    </Typography>

    <Typography
      component={ReactMarkdown}
      source={character.description}
      className={classes.markdown}
    />
  </BlockPaper>
)

export default withStyles(styles)(BasicsBlock)
