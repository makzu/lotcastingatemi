// @flow
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingLine from '../generic/ratingLine.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import sharedStyles from 'styles/'
import { getSpecificCharacter, getMeritsForCharacter } from 'selectors'
import type { Character, fullMerit as Merit } from 'utils/flow-types'

const styles = theme => ({
  ...sharedStyles(theme),
  name: {
    textTransform: 'capitalize',
  },
  categoryLine: {
    textTransform: 'capitalize',
  },
  meritName: {
    ...theme.typography.caption,
    textTransform: 'capitalize',
    marginLeft: theme.spacing.unit,
  },
})

type _SingleMeritProps = { merit: Merit, classes: Object }
const _SingleMerit = ({ merit, classes }: _SingleMeritProps) => (
  <BlockPaper>
    <Typography variant="title">
      <RatingLine rating={merit.rating} dontFill merit>
        <span className={classes.name}>{merit.label || merit.merit_name}</span>
        {merit.label && (
          <span className={classes.meritName}>({merit.merit_name})</span>
        )}
      </RatingLine>
    </Typography>

    <Typography className={classes.categoryLine} variant="caption" gutterBottom>
      {merit.supernatural && 'Supernatural '}
      {merit.merit_cat} {merit.merit_cat !== 'flaw' && 'Merit'}
    </Typography>

    <Typography component="div">
      <ReactMarkdown source={merit.description} className={classes.markdown} />
    </Typography>

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
        <DocumentTitle
          title={`${this.props.character.name} Merits | Lot-Casting Atemi`}
        />
        <Hidden smUp>
          <Grid item xs={12}>
            <div style={{ height: '1em' }}>&nbsp;</div>
          </Grid>
        </Hidden>

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
