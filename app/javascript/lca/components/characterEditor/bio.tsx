import { deepEqual } from 'fast-equals'
import { Component, SyntheticInputEvent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'

import XpEditor from './editors/xpEditor'
import AnimalFormsEditor from './editors/AnimalFormsEditor'
import DocumentTitle from 'components/generic/DocumentTitle'
import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'

import ProtectedComponent from 'containers/ProtectedComponent'
import withRouter from 'containers/withRouter'
import { updateCharacter } from 'ducks/actions'
import { getSpecificCharacter } from '@/ducks/entities/character'
import { showLunarTraits } from 'utils/calculated'
import { Character } from '@/types'

interface Props {
  character: Character
  updateCharacter: $TSFixMeFunction
}

class BioEditor extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { character } = this.props
    if (deepEqual(character[name], value)) return
    this.props.updateCharacter(character.id, {
      [name]: value,
    })
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
          <div
            style={{
              height: '2.5em',
            }}
          >
            &nbsp;
          </div>
        </Hidden>

        <Grid container spacing={3}>
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
                maxRows={100}
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

              {showLunarTraits(character) && (
                <AnimalFormsEditor
                  character={character}
                  onChange={handleChange}
                />
              )}
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
                maxRows={100}
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
                maxRows={100}
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
  character: getSpecificCharacter(state, props.params.id),
})

export default compose(
  ProtectedComponent,
  withRouter,
  connect(mapStateToProps, { updateCharacter }),
)(BioEditor)
