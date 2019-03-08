// @flow
import { deepEqual } from 'fast-equals'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import XpEditor from './editors/xpEditor.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import TextField from 'components/generic/TextField.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateCharacter } from 'ducks/actions.js'
import { getSpecificCharacter } from 'ducks/selectors'
import { showLunarTraits } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

type Props = { character: Character, updateCharacter: Function }
class BioEditor extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { character } = this.props

    if (deepEqual(character[name], value)) return

    this.props.updateCharacter(character.id, { [name]: value })
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const { character } = this.props
    const { handleChange } = this

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

          <Grid item xs={12} md={6}>
            <BlockPaper>
              <TextField
                name="description"
                value={character.description}
                label="Description"
                helperText="(Supports Markdown)"
                margin="dense"
                multiline
                fullWidth
                rows={2}
                rowsMax={100}
                onChange={handleChange}
              />

              {showLunarTraits(character) && (
                <>
                  <TextField
                    name="totem"
                    value={character.totem}
                    label="Totem/Spirit Shape"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />

                  <TextField
                    name="tell"
                    value={character.tell}
                    label="Tell"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </>
              )}

              <TextField
                name="anima_display"
                value={character.anima_display}
                label="Iconic Anima"
                margin="dense"
                fullWidth
                onChange={handleChange}
              />
            </BlockPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <BlockPaper>
              <TextField
                name="lore_background"
                value={character.lore_background}
                label="Lore Background"
                margin="dense"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                name="native_language"
                value={character.native_language}
                label="Native Language"
                margin="dense"
                fullWidth
                onChange={handleChange}
              />
            </BlockPaper>
          </Grid>

          <Grid item xs={12}>
            <BlockPaper>
              <TextField
                name="notes"
                value={character.notes}
                label="Notes"
                helperText="(Supports Markdown)"
                margin="dense"
                multiline
                fullWidth
                rows={2}
                rowsMax={100}
                onChange={handleChange}
              />

              <TextField
                name="equipment"
                value={character.equipment}
                label="Inventory and Equipment"
                helperText="(Supports Markdown)"
                margin="dense"
                multiline
                fullWidth
                rows={2}
                rowsMax={100}
                onChange={handleChange}
              />
            </BlockPaper>
          </Grid>

          <Grid item xs={12}>
            <BlockPaper>
              <TextField
                name="portrait_link"
                value={character.portrait_link}
                label="Portrait URL"
                margin="dense"
                fullWidth
                onChange={handleChange}
              />

              <div style={{}}>
                <img src={character.portrait_link} />
              </div>
            </BlockPaper>
          </Grid>

          <Grid item xs={12}>
            <XpEditor character={character} onChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  character: getSpecificCharacter(state, props.match.params.characterId),
})

export default compose(
  ProtectedComponent,
  connect(
    mapStateToProps,
    { updateCharacter }
  )
)(BioEditor)
