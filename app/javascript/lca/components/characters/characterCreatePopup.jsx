// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import SolarCasteSelect from 'components/characterEditor/exaltTraits/SolarCasteSelect.jsx'
import DbAspectSelect from 'components/characterEditor/exaltTraits/DbAspectSelect.jsx'
import { createCharacter } from 'ducks/actions.js'

type Props = { id: number, createCharacter: Function }
type State = { open: boolean, character: Object }
class CharacterCreatePopup extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      character: {
        name: '',
        caste: '',
        type: 'SolarCharacter',
        exalt_type: '',
        aspect: false,
      },
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAspectChange = this.handleAspectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    const { name, value } = e.target
    let exaltType = {}

    if (name == 'type') {
      if (value == '') {
        e.preventDefault()
        return
      } else if (value == 'Character')
        exaltType = { exalt_type: 'Mortal', aspect: false }
      else if (value == 'SolarCharacter')
        exaltType = { exalt_type: 'Solar', aspect: false }
      else if (value == 'DragonbloodCharacter')
        exaltType = { exalt_type: 'Dragonblood', aspect: true }
      else exaltType = { exalt_type: 'Exalt' }
    }

    this.setState({
      character: { ...this.state.character, [name]: value, ...exaltType },
    })
  }

  handleAspectChange = () => {
    this.setState({
      character: {
        ...this.state.character,
        aspect: !this.state.character.aspect,
      },
    })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.createCharacter(this.state.character)
  }

  render() {
    const {
      handleOpen,
      handleClose,
      handleChange,
      handleAspectChange,
      handleSubmit,
    } = this
    const { character } = this.state

    return (
      <Fragment>
        <Button onClick={handleOpen} data-cy="create-character">
          Create New
        </Button>
        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Create New Character</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                name="name"
                value={character.name}
                label="Name"
                margin="normal"
                fullWidth
                onChange={handleChange}
              />
            </div>

            <div>
              <TextField
                select
                name="type"
                value={character.type}
                label={
                  character.type === 'Character'
                    ? 'Character Type'
                    : 'Exalt Type '
                }
                onChange={handleChange}
                fullWidth
                margin="normal"
                data-cy="select-exalt-type"
              >
                <ListSubheader disabled value="">
                  Canon/Published Exalts
                </ListSubheader>,
                <MenuItem value="Character">Mortal</MenuItem>,
                <MenuItem value="SolarCharacter">Solar Exalt</MenuItem>
                <MenuItem value="DragonbloodCharacter">
                  Dragon-Blooded Exalt
                </MenuItem>
                <ListSubheader disabled value="">
                  Custom / Houserule Exalts
                </ListSubheader>
                <MenuItem value="CustomAbilityCharacter">
                  Ability-Based Exalt
                </MenuItem>,
                <MenuItem value="CustomAttributeCharacter">
                  Attribute-Based Exalt
                </MenuItem>
                <MenuItem value="CustomEssenceCharacter">
                  Essence-Based Exalt
                </MenuItem>
              </TextField>
            </div>

            {character.type == 'SolarCharacter' && (
              <div>
                <Typography paragraph>
                  Selecting this option means the system will try to follow the
                  rules in the core book as closely as it can. If your group
                  uses house rules, especially ones that change available Caste
                  or Supernal abilities, choose Houserule Ability-based exalt
                  instead.
                </Typography>
                <SolarCasteSelect
                  value={character.caste}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            )}
            {character.type == 'DragonbloodCharacter' && (
              <div>
                <Typography paragraph>
                  Selecting this option means the system will try to follow the
                  rules in the core book as closely as it can. If your group
                  uses house rules, especially ones that change available Aspect
                  abilities or mote pools, choose Houserule Ability-based exalt
                  instead.
                </Typography>
                <DbAspectSelect
                  value={character.caste}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            )}
            {(character.type == 'CustomAttributeCharacter' ||
              character.type == 'CustomAbilityCharacter' ||
              character.type == 'CustomEssenceCharacter') && (
              <Typography component="div">
                <TextField
                  name="caste"
                  value={character.caste}
                  fullWidth
                  label={character.aspect ? 'Aspect' : 'Caste'}
                  onChange={handleChange}
                  margin="dense"
                />
                <br />
                <TextField
                  name="exalt_type"
                  value={character.exalt_type}
                  fullWidth
                  label="Type"
                  onChange={handleChange}
                  margin="dense"
                />
                <br />
                Has Castes&nbsp;&nbsp;&nbsp;
                <FormControlLabel
                  control={
                    <Switch
                      checked={character.aspect}
                      name="aspect"
                      onChange={handleAspectChange}
                    />
                  }
                  label="Has Aspects"
                />
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="raised"
              color="primary"
              data-cy="submit"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ id: state.session.id })
export default connect(
  mapStateToProps,
  { createCharacter }
)(CharacterCreatePopup)
