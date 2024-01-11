import * as React from 'react'
const { Component, Fragment } = React
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CanonExcellencyCopy from './CanonExcellencyCopy'
import AbilitySelect from 'components/generic/abilitySelect'
import type { Character } from 'utils/flow-types'

class ExcellencyEditor extends Component<
  {
    character: Character
    onChange: $TSFixMeFunction
    onChangeMulti: $TSFixMeFunction
  },
  {
    open: boolean
  }
> {
  state = {
    open: false,
  }
  handleExcellencyChange = (e: Record<string, $TSFixMe>) => {
    // Not ideal but Flow complains if I have this set to SyntheticEvent<>
    // TODO: remove other entries on the list with *
    const { name, value } = e.target
    const val = value.filter((e) => e !== '').join('+')
    this.props.onChange({
      target: {
        name: name,
        value: val,
      },
    })
  }
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { character, onChange, onChangeMulti } = this.props
    const { handleOpen, handleClose, handleExcellencyChange } = this
    const { excellency, excellency_stunt } = this.props.character
    const excellencyOptions = [
      <MenuItem key="solar" value="solar">
        Solar (Attribute + Ability)
      </MenuItem>,
      <MenuItem key="dragonblood" value="dragonblood">
        Dragon-Blooded (Attribute + Specialty)
      </MenuItem>,
      <MenuItem key="sidereal" value="sidereal">
        Sidereal (Higher of Essence or 3, will not halve static values)
      </MenuItem>,
      <Divider
        key="div1"
        style={{
          margin: '0.125em 0',
        }}
      />,
      <MenuItem key="attribute" value="attribute">
        Attribute
      </MenuItem>,
      <MenuItem key="ability" value="ability">
        Ability
      </MenuItem>,
      <MenuItem key="specialty" value="specialty">
        Specialty
      </MenuItem>,
      <MenuItem key="essence" value="essence">
        Essence
      </MenuItem>,
      <MenuItem key="attributeonanima" value="attributeonanima">
        Attribute (while anima is glowing+)
      </MenuItem>,
      <MenuItem key="abilityonanima" value="abilityonanima">
        Ability (while anima is glowing+)
      </MenuItem>,
      <MenuItem key="essenceonanima" value="essenceonanima">
        Essence (while anima is glowing+)
      </MenuItem>,
      <MenuItem key="otherability" value="otherability">
        Another Ability (will select highest available)
      </MenuItem>,
      <MenuItem key="otherattribute" value="otherattribute">
        Another Attribute (will select highest available)
      </MenuItem>,
      <MenuItem key="anima" value="anima">
        Anima (Dim: 0, Glowing: 1, Burning: 2, Bonfire: 3)
      </MenuItem>,
      <MenuItem key="subtleanima" value="subtleanima">
        3 - Anima value (Dim: 3, Glowing: 2, Burning: 1, Bonfire: 0)
      </MenuItem>,
      <MenuItem key="essenceor3" value="essenceor3">
        Essence or 3 (whichever is higher)
      </MenuItem>,
      <Divider
        key="div2"
        style={{
          margin: '0.125em 0',
        }}
      />,
      <MenuItem key="roundup" value="roundup">
        Round cap up for static ratings
      </MenuItem>,
      <MenuItem key="nohalf" value="nohalf">
        Don&apos;t halve cap for static ratings
      </MenuItem>,
    ]
    return (
      <Fragment>
        <Button onClick={handleOpen}>Excellencies</Button>
        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Edit Excellencies</DialogTitle>
          <DialogContent>
            <Typography>
              Build your custom Exalt&apos;s excellency. Examples:
            </Typography>
            <Typography>
              QC Dragon-Blooded (Core p.540): Ability + Specialty
            </Typography>
            <Typography>
              QC Lunars (Core p.545): Attribute, Stunt: Attribute + Other
              Attribute
            </Typography>
            <Typography>QC Sidereals (Core p.548): Essence</Typography>
            <Typography>
              QC Abyssals (Core p.549): Attribute + Ability
            </Typography>
            <Typography>
              QC Liminals (Core p.550): Attribute + Essence(glowing+)
            </Typography>

            <Typography
              style={{
                marginTop: '1em',
              }}
            >
              Some Exalts, like Lunars and Revana Quin (Core p. 552) have
              different dice caps under certain stunts. You can set those here,
              and they will appear below relevant pools. Leave blank if your
              excellency limits do not change based on stunts.
            </Typography>

            <TextField
              select
              label="Excellency Cap"
              name="excellency"
              SelectProps={{
                multiple: true,
              }}
              value={excellency.split('+') || []}
              onChange={handleExcellencyChange}
              margin="dense"
              fullWidth
            >
              {excellency === '' && (
                <MenuItem key="blank" value="" disabled>
                  No Excellency
                </MenuItem>
              )}
              {excellencyOptions}
            </TextField>

            <TextField
              select
              label="Stunt Excellency cap"
              name="excellency_stunt"
              SelectProps={{
                multiple: true,
              }}
              value={excellency_stunt.split('+') || []}
              onChange={handleExcellencyChange}
              margin="dense"
              fullWidth
            >
              {excellency_stunt === '' && (
                <MenuItem key="blank" value="" disabled>
                  No change to caps on stunt
                </MenuItem>
              )}
              {excellencyOptions}
            </TextField>

            <AbilitySelect
              name="excellencies_for"
              label="Ratings with Excellencies"
              value={character.excellencies_for}
              onChange={onChange}
              multiple
              fullWidth
              margin="dense"
              withAttributes
              prependOptions={[
                <MenuItem value="*" key="*">
                  All Attribute + Ability rolls
                </MenuItem>,
                <MenuItem value="solar" key="solar">
                  As Solars or Sidereals (caste/favored attributes/abilities
                  &gt; 0, other attributes/abilities with at least one Charm)
                </MenuItem>,
                <MenuItem value="dragonblood" key="dragonblood">
                  As Dragon-Blooded (all attributes/abilities with an excellency
                  keyworded Charm)
                </MenuItem>,
                <MenuItem value="lunar" key="lunar">
                  As Lunars (caste/favored attributes &ge; 3 or with &ge; 2
                  Charms, other attributes &ge; 4 or with &ge; 3 Charms)
                </MenuItem>,
              ]}
            />
          </DialogContent>
          <DialogActions>
            <div
              style={{
                flex: 1,
              }}
            >
              <CanonExcellencyCopy
                character={character}
                onChangeMulti={onChangeMulti}
              />
            </div>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default ExcellencyEditor
