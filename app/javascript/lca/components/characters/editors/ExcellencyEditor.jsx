/* @flow */
import * as React from 'react'
const { Component, Fragment } = React

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import type { fullChar } from 'utils/propTypes/flow.js'

type Props = { character: fullChar, onChange: Function }
type State = { open: boolean, excellency: Array<string>, excellency_stunt: Array<string> }

class ExcellencyEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: false,
      excellency: this.props.character.excellency.split('+') || [],
      excellency_stunt: this.props.character.excellency_stunt.split('+') || [],
    }
    this.handleExcellencyChange = this.handleExcellencyChange.bind(this)
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      excellency: newProps.character.excellency.split('+') || [],
      excellency_stunt: this.props.character.excellency_stunt.split('+') || [],
    })
  }

  handleExcellencyChange = (e: Object) => { // Not ideal but Flow complains if I have this set to SyntheticEvent<>
    // TODO: remove other entries on the list with *
    const { name, value } = e.target
    let val = value.filter((e) => e !== '').join('+')
    this.props.onChange({ target: { name: name, value: val }})
  }

  handleOpen  = () => { this.setState({ open: true  }) }
  handleClose = () => { this.setState({ open: false }) }

  render() {
    const { character, onChange } = this.props
    const { handleOpen, handleClose, handleExcellencyChange } = this
    const { excellency, excellency_stunt } = this.state

    let excellencyOptions = [
      <MenuItem key="solar" value="solar">Solar (Attribute + Ability)</MenuItem>,
      <MenuItem key="attribute" value="attribute">Attribute</MenuItem>,
      <MenuItem key="ability" value="ability">Ability</MenuItem>,
      <MenuItem key="specialty" value="specialty">Specialty</MenuItem>,
      <MenuItem key="essence" value="essence">Essence</MenuItem>,
      <MenuItem key="attributeonanima" value="attributeonanima">Attribute (while anima is glowing+)</MenuItem>,
      <MenuItem key="abilityonanima" value="abilityonanima">Ability (while anima is glowing+)</MenuItem>,
      <MenuItem key="essenceonanima" value="essenceonanima">Essence (while anima is glowing+)</MenuItem>,
      <MenuItem key="otherability" value="otherability">Another Ability (will select highest available)</MenuItem>,
      <MenuItem key="otherattribute" value="otherattribute">Another Attribute (will select highest available)</MenuItem>,
      <MenuItem key="roundup" value="roundup">Round cap up for static ratings</MenuItem>
    ]

    return <Fragment>
      <Button
        onClick={ handleOpen }
      >
        Excellencies
      </Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Edit Excellencies</DialogTitle>
        <DialogContent>
          <Typography>
            Build your custom Exalt&apos;s excellency. Examples:
          </Typography>
          <Typography>
            QC Dragon-Blooded (Core p.540): Ability + Specialty
          </Typography>
          <Typography>
            QC Lunars (Core p.545): Attribute, Stunt: Attribute + Other Attribute
          </Typography>
          <Typography>
            QC Sidereals (Core p.548): Essence
          </Typography>
          <Typography>
            QC Abyssals (Core p.549): Attribute + Ability
          </Typography>
          <Typography>
            QC Liminals (Core p.550): Attribute + Essence(glowing+)
          </Typography>

          <Typography style={{ marginTop: '1em' }}>
            Some Exalts, like Lunars  and Revana Quin (Core p. 552)
            have different dice caps under certain stunts. You can set those
            here, and they will appear below relevant pools. Leave blank if
            your excellency limits do not change based on stunts.
          </Typography>

          <TextField select
            label="Excellency Cap"
            name="excellency" SelectProps={{ multiple: true }}
            value={ excellency }
            onChange={ handleExcellencyChange }
            margin="dense"
            fullWidth
          >
            { excellency[0] == '' &&
              <MenuItem key="blank" value="" disabled>No Excellency</MenuItem>
            }
            { excellencyOptions }
          </TextField>

          <TextField select
            label="Stunt Excellency cap"
            name="excellency_stunt" SelectProps={{ multiple: true }}
            value={ excellency_stunt }
            onChange={ handleExcellencyChange }
            margin="dense"
            fullWidth
          >
            { excellency_stunt[0] == '' &&
              <MenuItem key="blank" value="" disabled>No change to caps on stunt</MenuItem>
            }
            { excellencyOptions }
          </TextField>

          <AbilitySelect name="excellencies_for"
            label="Ratings with Excellencies"
            value={ character.excellencies_for }
            onChange={ onChange }
            multiple fullWidth margin="dense"
            withAttributes
            prependOptions={[
              <MenuItem value="*" key="*">All Attribute + Ability rolls</MenuItem>,
              <MenuItem value="solar" key="solar">As Solars (caste/favored abilities &gt; 0, abilities with Charms)</MenuItem>,
              <MenuItem value="dragonblood" key="dragonblood">As Dragon-Blooded (all abilities with excellency keyworded Charm)</MenuItem>
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Done</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}

export default ExcellencyEditor
