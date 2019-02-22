// @flow
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import CharacterLoadError from './CharacterLoadError.jsx'
import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import sharedStyles from 'styles/'
import { getSpecificCharacter } from 'selectors'
import { solarXpName, spentXp, spentSolarXp } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  ...sharedStyles(theme),
  portrait: {
    maxWidth: '100%',
    display: 'block',
    margin: 'auto',
  },
  portraitWrap: {
    //textAlign: 'center',
  },
})

const xpTable = log =>
  log.map((l, i) => (
    <tr key={`${l.label}_${i}`}>
      <td style={{ textAlign: 'right' }}>{l.points}:</td>
      <td style={{ width: '100%' }}>{l.label}</td>
    </tr>
  ))

type Props = { character: Character, classes: Object }
class BioFullPage extends Component<Props> {
  render() {
    /* Escape hatch */
    if (this.props.character == undefined) return <CharacterLoadError />

    const { character, classes } = this.props

    return (
      <div>
        <DocumentTitle title={`${character.name} Bio | Lot-Casting Atemi`} />

        <Hidden smUp>
          <div style={{ height: '2.5em' }}>&nbsp;</div>
        </Hidden>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5">Bio/Misc</Typography>
          </Grid>

          <Grid item xs={12}>
            <BlockPaper>
              <MarkdownDisplay source={character.description} />
            </BlockPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <BlockPaper>
              {character.type !== 'Character' && (
                <Typography paragraph>
                  Iconic Anima: {character.anima_display || 'Not specified'}
                </Typography>
              )}
              <Typography paragraph>
                Lore Background: {character.lore_background || 'Not specified'}
              </Typography>
              <Typography paragraph>
                Native Language: {character.native_language}
              </Typography>
            </BlockPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <BlockPaper>
              <div className={classes.portraitWrap}>
                <a
                  href={character.portrait_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={character.portrait_link}
                    className={classes.portrait}
                  />
                </a>
              </div>
            </BlockPaper>
          </Grid>

          <Grid item xs={12}>
            <BlockPaper>
              <Typography variant="subtitle1">
                Inventory/Other Equipment
              </Typography>
              <MarkdownDisplay source={character.equipment || 'None'} />
              <Typography variant="subtitle1">Notes</Typography>
              <MarkdownDisplay source={character.notes} />
            </BlockPaper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <BlockPaper>
              <Typography variant="subtitle1">XP</Typography>
              <Typography component="table">
                <tbody>{xpTable(character.xp_log)}</tbody>
              </Typography>
              <Typography>
                Earned: {character.xp_total}, Spent: {spentXp(character)},
                Remaining: {character.xp_total - spentXp(character)}
              </Typography>
            </BlockPaper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <BlockPaper>
              <Typography variant="subtitle1">
                {solarXpName(character) + ' XP'}
              </Typography>
              <Typography component="table">
                <tbody>{xpTable(character.xp_log_solar)}</tbody>
              </Typography>
              <Typography>
                Earned: {character.xp_solar_total}, Spent:{' '}
                {spentSolarXp(character)}, Remaining:{' '}
                {character.xp_solar_total - spentSolarXp(character)}
              </Typography>
            </BlockPaper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)

  return {
    character,
  }
}

export default compose(
  ProtectedComponent,
  withStyles(styles),
  connect(mapStateToProps)
)(BioFullPage)
