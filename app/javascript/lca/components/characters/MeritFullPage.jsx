import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingLine from '../generic/ratingLine.jsx'
import { fullMerit } from '../../utils/propTypes'

const styles = theme => ({
  name: {
    textTransform: 'capitalize',
  },
  categoryLine: {
    textTransform: 'capitalize',
  },
  meritName: { ...theme.typography.caption,
    textTransform: 'capitalize',
  },
})

function _SingleMerit(props) {
  const { merit, classes } = props

  return <BlockPaper>
    <RatingLine rating={ merit.rating } dontFill>
      <Typography variant="title">
        <span className={ classes.name }>
          { merit.label || merit.merit_name }
        </span>
        { merit.label &&
          <span className={ classes.meritName}>
            &nbsp;&nbsp;({ merit.merit_name })
          </span>
        }
      </Typography>
    </RatingLine>

    <Typography className={ classes.categoryLine } variant="caption" gutterBottom>
      { merit.supernatural && 'Supernatural '}
      { merit.merit_cat } Merit
    </Typography>

    <Typography>
      { merit.description }
    </Typography>

    <Typography variant="caption">
      Ref: { merit.ref }
    </Typography>
  </BlockPaper>
}

_SingleMerit.propTypes = {
  merit: PropTypes.shape(fullMerit),
  classes: PropTypes.object,
}
export const SingleMerit = withStyles(styles)(_SingleMerit)

class MeritFullPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const mts = this.props.merits.map((m) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ m.id }>
        <SingleMerit merit={ m } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1em', }}>&nbsp;</div>
      </Grid>

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Merits
        </Typography>
      </Grid>

      { mts }
    </Grid>
  }
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId]
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = character.merits.map((id) => state.entities.merits[id])
  }

  return {
    character,
    merits,
  }
}
MeritFullPage.propTypes = {
  character: PropTypes.shape({ id: PropTypes.number.isRequired }),
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)),
}

export default connect(
  mapStateToProps
)(MeritFullPage)
