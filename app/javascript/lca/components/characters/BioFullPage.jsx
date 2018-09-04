// @flow
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import CharacterLoadError from './CharacterLoadError.jsx'
import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import sharedStyles from 'styles/'
import { getSpecificCharacter } from 'selectors'
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
            <Typography variant="headline">Bio/Misc</Typography>
          </Grid>

          <Grid item xs={12}>
            <BlockPaper>
              <Typography
                component={ReactMarkdown}
                className={classes.markdown}
                source={character.description}
              />
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
              <Typography variant="subheading">Notes</Typography>
              <Typography
                component={ReactMarkdown}
                className={classes.markdown}
                source={character.notes}
              />
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
