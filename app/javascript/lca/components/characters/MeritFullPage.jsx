// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingLine from '../generic/ratingLine.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { getSpecificCharacter, getMeritsForCharacter } from 'selectors'
import type { Character, fullMerit as Merit } from 'utils/flow-types'

const styles = theme => ({
  name: {
    textTransform: 'capitalize',
  },
  categoryLine: {
    textTransform: 'capitalize',
  },
  meritName: {
    ...theme.typography.caption,
    textTransform: 'capitalize',
  },
})

type _SingleMeritProps = { merit: Merit, classes: Object }
const _SingleMerit = ({ merit, classes }: _SingleMeritProps) => (
  <BlockPaper>
    <Typography variant="title">
      <RatingLine rating={merit.rating} dontFill merit>
        <span className={classes.name}>{merit.label || merit.merit_name}</span>
        {merit.label && (
          <span className={classes.meritName}>
            &nbsp;&nbsp;({merit.merit_name})
          </span>
        )}
      </RatingLine>
    </Typography>

    <Typography className={classes.categoryLine} variant="caption" gutterBottom>
      {merit.supernatural && 'Supernatural '}
      {merit.merit_cat} Merit
    </Typography>

    <Typography>{merit.description}</Typography>

    <Typography variant="caption">Ref: {merit.ref}</Typography>
  </BlockPaper>
)
export const SingleMerit = withStyles(styles)(_SingleMerit)

type Props = { character: Character, merits: Array<Merit> }
class MeritFullPage extends Component<Props> {
  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const mts = this.props.merits.map(m => (
      <Grid item xs={12} md={6} xl={4} key={m.id}>
        <SingleMerit merit={m} />
      </Grid>
    ))

    return (
      <Grid container spacing={24}>
        <Grid item hidden={{ smUp: true }} xs={12}>
          <div style={{ height: '1em' }}>&nbsp;</div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="headline">Merits</Typography>
        </Grid>

        {mts}
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}

export default ProtectedComponent(connect(mapStateToProps)(MeritFullPage))
