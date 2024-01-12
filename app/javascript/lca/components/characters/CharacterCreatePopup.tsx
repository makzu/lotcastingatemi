import * as React from 'react'
import { ConnectedProps, connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import ExaltTypeSelect from 'components/characterEditor/exaltTraits/ExaltTypeSelect'
import SolarCasteSelect from 'components/characterEditor/exaltTraits/SolarCasteSelect'
import DbAspectSelect from 'components/characterEditor/exaltTraits/DbAspectSelect'
import LunarCasteSelect from 'components/characterEditor/exaltTraits/LunarCasteSelect'
import SiderealCasteSelect from 'components/characterEditor/exaltTraits/SiderealCasteSelect'
import AbyssalCasteSelect from 'components/characterEditor/exaltTraits/AbyssalCasteSelect'
import { createCharacter } from 'ducks/actions'

import { RootState } from 'store'

const initialState = {
  open: false,
  character: {
    name: '',
    caste: '',
    type: 'SolarCharacter',
    exalt_type: '',
    aspect: false,
  },
}

interface State {
  open: boolean
  character: {
    exalt_type: string
    name: string
    caste: string
    type: string
    aspect: boolean
  }
}

class CharacterCreatePopup extends React.Component<PropsFromRedux, State> {
  state = initialState

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState(initialState)
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let exaltType = {}

    if (name === 'type') {
      if (value === '' || value == null) {
        e.preventDefault()
        return
      }
      switch (value) {
        case 'Character':
          exaltType = { exalt_type: 'Mortal', aspect: false }
          break
        case 'SolarCharacter':
          exaltType = { exalt_type: 'Solar', aspect: false }
          break
        case 'DragonbloodCharacter':
          exaltType = { exalt_type: 'Dragonblood', aspect: true }
          break
        case 'LunarCharacter':
          exaltType = { exalt_type: 'Lunar', aspect: false }
          break
        case 'SiderealCharacter':
          exaltType = { exalt_type: 'Sidereal', aspect: false }
          break
        case 'AbyssalCharacter':
          exaltType = { exalt_type: 'Abyssal', aspect: false }
          break
        default:
          exaltType = { exalt_type: 'Exalt' }
      }
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
      <>
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
                inputProps={{
                  autocomplete: 'off',
                  'data-1p-ignore': 'true',
                  'data-lp-ignore': 'true',
                }}
              />
            </div>

            <div>
              <ExaltTypeSelect value={character.type} onChange={handleChange} />
            </div>

            {character.type === 'SolarCharacter' && (
              <>
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
              </>
            )}
            {character.type === 'DragonbloodCharacter' && (
              <>
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
              </>
            )}
            {character.type === 'LunarCharacter' && (
              <>
                <Typography paragraph>
                  Selecting this option means the system will try to follow the
                  rules in the core book as closely as it can. If your group
                  uses house rules, especially ones that change available Caste
                  Attributes, choose Houserule Attribute-based exalt instead.
                </Typography>
                <LunarCasteSelect
                  value={character.caste}
                  onChange={handleChange}
                  fullWidth
                />
              </>
            )}
            {character.type === 'SiderealCharacter' && (
              <>
                <Typography paragraph>
                  Selecting this option means the system will try to follow the
                  rules in the core book as closely as it can. If your group
                  uses house rules, especially ones that change available Caste
                  Abilities, choose Houserule Ability-based exalt instead.
                </Typography>
                <SiderealCasteSelect
                  value={character.caste}
                  onChange={handleChange}
                  fullWidth
                />
              </>
            )}
            {character.type === 'AbyssalCharacter' && (
              <>
                <Typography paragraph>
                  Selecting this option means the system will try to follow the
                  rules in the core book as closely as it can. If your group
                  uses house rules, especially ones that change available Caste
                  or Apocalyptic abilities, choose Houserule Ability-based exalt
                  instead.
                </Typography>
                <AbyssalCasteSelect
                  value={character.caste}
                  onChange={handleChange}
                  fullWidth
                />
              </>
            )}
            {(character.type === 'CustomAttributeCharacter' ||
              character.type === 'CustomAbilityCharacter' ||
              character.type === 'CustomEssenceCharacter') && (
              <>
                <Typography paragraph>
                  {character.type === 'CustomAttributeCharacter' && (
                    <>
                      An Attribute-based Exalt, like Lunars, Liminals, or
                      Alchemicals. Their Charms are arranged by Attribute. They
                      can have Caste and Favored Attributes and Favored
                      Abilities.
                    </>
                  )}
                  {character.type === 'CustomAbilityCharacter' && (
                    <>
                      An Ability-based Exalt, like Solars, Abyssals, Sidereals,
                      and the Dragon-Blooded. Their Charms are arranged by
                      Ability. They can have Caste and Favored Abilities, as
                      well as a Supernal/Apocalyptic Ability.
                    </>
                  )}
                  {character.type === 'CustomEssenceCharacter' && (
                    <>
                      An Essence-based Exalt, like 2e Infernals. This option
                      also works well for spirits. Their Charms are not grouped
                      up by Attribute or Ability.
                    </>
                  )}
                </Typography>
                <Typography>
                  Custom characters&apos; mote pools must be set manually, but
                  can be any size. Their Excellency must also be set up
                  manually, but it has a wide range of options.
                </Typography>
                <div>
                  <TextField
                    name="caste"
                    value={character.caste}
                    fullWidth
                    label={character.aspect ? 'Aspect' : 'Caste'}
                    onChange={handleChange}
                    margin="dense"
                    helperText="(Optional)"
                  />
                </div>
                <div>
                  <TextField
                    name="exalt_type"
                    value={character.exalt_type}
                    fullWidth
                    label="Type"
                    onChange={handleChange}
                    margin="dense"
                  />
                </div>
                <Typography component="div">
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
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              data-cy="submit"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ id: state.session.id })
const connector = connect(mapStateToProps, { createCharacter })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CharacterCreatePopup)
