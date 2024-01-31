import { useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'

import AbyssalCasteSelect from '@/components/characterEditor/exaltTraits/AbyssalCasteSelect'
import DbAspectSelect from '@/components/characterEditor/exaltTraits/DbAspectSelect'
import ExaltTypeSelect from '@/components/characterEditor/exaltTraits/ExaltTypeSelect'
import LunarCasteSelect from '@/components/characterEditor/exaltTraits/LunarCasteSelect'
import SiderealCasteSelect from '@/components/characterEditor/exaltTraits/SiderealCasteSelect'
import SolarCasteSelect from '@/components/characterEditor/exaltTraits/SolarCasteSelect'
import { createCharacter } from '@/ducks/actions'
import { useAppDispatch, useDialogLogic } from '@/hooks'
import { type ExaltType } from '@/types'

const CreateCharacterDialog = () => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [name, setName] = useState('')
  const [type, setType] = useState<ExaltType>('SolarCharacter')
  const [exalt_type, setExaltType] = useState('')
  const [caste, setCaste] = useState('')
  const [aspect, setAspect] = useState(false)

  // Set Aspect to false if the exalt type doesn't have aspects
  useEffect(() => {
    switch (type) {
      case 'SolarCharacter':
      case 'LunarCharacter':
      case 'SiderealCharacter':
      case 'AbyssalCharacter':
        setAspect(false)
        setExaltType('')
        break
      case 'DragonbloodCharacter':
        setAspect(true)
        setExaltType('')
        break
      default:
        break
    }
  }, [type])

  const handleSubmit = () => {
    dispatch(createCharacter({ name, type, caste, aspect }))
    close()
  }

  return (
    <>
      <Button onClick={open} data-cy="create-character">
        Create New
      </Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Create New Character</DialogTitle>

        <DialogContent>
          <div>
            <TextField
              variant="standard"
              name="name"
              value={name}
              label="Name"
              margin="normal"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              inputProps={{
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lp-ignore': 'true',
              }}
            />
          </div>

          <div>
            <ExaltTypeSelect
              value={type}
              onChange={(e) => setType(e.target.value as ExaltType)}
            />
          </div>

          {type === 'SolarCharacter' && (
            <>
              <Typography paragraph>
                Selecting this option means the system will try to follow the
                rules in the core book as closely as it can. If your group uses
                house rules, especially ones that change available Caste or
                Supernal abilities, choose Houserule Ability-based exalt
                instead.
              </Typography>
              <SolarCasteSelect
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                fullWidth
              />
            </>
          )}
          {type === 'DragonbloodCharacter' && (
            <>
              <Typography paragraph>
                Selecting this option means the system will try to follow the
                rules in the core book as closely as it can. If your group uses
                house rules, especially ones that change available Aspect
                abilities or mote pools, choose Houserule Ability-based exalt
                instead.
              </Typography>
              <DbAspectSelect
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                fullWidth
              />
            </>
          )}
          {type === 'LunarCharacter' && (
            <>
              <Typography paragraph>
                Selecting this option means the system will try to follow the
                rules in the core book as closely as it can. If your group uses
                house rules, especially ones that change available Caste
                Attributes, choose Houserule Attribute-based exalt instead.
              </Typography>
              <LunarCasteSelect
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                fullWidth
              />
            </>
          )}
          {type === 'SiderealCharacter' && (
            <>
              <Typography paragraph>
                Selecting this option means the system will try to follow the
                rules in the core book as closely as it can. If your group uses
                house rules, especially ones that change available Caste
                Abilities, choose Houserule Ability-based exalt instead.
              </Typography>
              <SiderealCasteSelect
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                fullWidth
              />
            </>
          )}
          {type === 'AbyssalCharacter' && (
            <>
              <Typography paragraph>
                Selecting this option means the system will try to follow the
                rules in the core book as closely as it can. If your group uses
                house rules, especially ones that change available Caste or
                Apocalyptic abilities, choose Houserule Ability-based exalt
                instead.
              </Typography>
              <AbyssalCasteSelect
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                fullWidth
              />
            </>
          )}

          {(type === 'CustomAttributeCharacter' ||
            type === 'CustomAbilityCharacter' ||
            type === 'CustomEssenceCharacter') && (
            <>
              <Typography paragraph>
                {type === 'CustomAttributeCharacter' && (
                  <>
                    An Attribute-based Exalt, like Lunars, Liminals, or
                    Alchemicals. Their Charms are arranged by Attribute. They
                    can have Caste and Favored Attributes and Favored Abilities.
                  </>
                )}
                {type === 'CustomAbilityCharacter' && (
                  <>
                    An Ability-based Exalt, like Solars, Abyssals, Sidereals,
                    and the Dragon-Blooded. Their Charms are arranged by
                    Ability. They can have Caste and Favored Abilities, as well
                    as a Supernal/Apocalyptic Ability.
                  </>
                )}
                {type === 'CustomEssenceCharacter' && (
                  <>
                    An Essence-based Exalt, like 2e Infernals. This option also
                    works well for spirits. Their Charms are not grouped up by
                    Attribute or Ability.
                  </>
                )}
              </Typography>
              <Typography>
                Custom characters&apos; mote pools must be set manually, but can
                be any size. Their Excellency must also be set up manually, but
                it has a wide range of options.
              </Typography>
              <div>
                <TextField
                  variant="standard"
                  name="caste"
                  value={caste}
                  fullWidth
                  label={aspect ? 'Aspect' : 'Caste'}
                  onChange={(e) => setCaste(e.target.value)}
                  margin="dense"
                  helperText="(Optional)"
                />
              </div>
              <div>
                <TextField
                  variant="standard"
                  name="exalt_type"
                  value={exalt_type}
                  fullWidth
                  label="Type"
                  onChange={(e) => setExaltType(e.target.value)}
                  margin="dense"
                />
              </div>

              <Typography component="div">
                Has Castes&nbsp;&nbsp;&nbsp;
                <FormControlLabel
                  control={
                    <Switch
                      checked={aspect}
                      name="aspect"
                      onChange={(e) => setAspect(e.target.checked)}
                    />
                  }
                  label="Has Aspects"
                />
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
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

export default CreateCharacterDialog
