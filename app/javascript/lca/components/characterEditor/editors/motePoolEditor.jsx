// @flow
import React, { Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import MoteCommittmentEditor from './moteCommittmentEditor.jsx'
import AnimaSelect from 'components/generic/AnimaSelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import {
  committedPersonalMotes,
  committedPeripheralMotes,
  hasAura,
} from 'utils/calculated'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  separator: {
    ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  flexRow: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  flexCol: {
    flex: 1,
  },
})

type Props = { character: Character, onChange: Function, classes: Object }
function MotePoolEditor({ character, onChange, classes }: Props) {
  if (character.type == 'Character' && !character.is_sorcerer) return <div />

  const showMoteTotalEditors =
    character.type == 'CustomAttributeCharacter' ||
    character.type == 'CustomAbilityCharacter' ||
    character.type == 'CustomEssenceCharacter'

  return (
    <BlockPaper>
      <Typography variant="h6">Mote Pools:</Typography>
      <div className={classes.flexRow}>
        {character.type !== 'Character' && (
          <Fragment>
            <div className={classes.flexCol}>
              <RatingField
                trait="motes_personal_current"
                value={character.motes_personal_current}
                label="Personal"
                max={
                  character.motes_personal_total -
                  committedPersonalMotes(character)
                }
                margin="dense"
                onChange={onChange}
              />
              <span className={classes.separator}>/</span>
              {showMoteTotalEditors && (
                <RatingField
                  trait="motes_personal_total"
                  value={character.motes_personal_total}
                  label="Total"
                  margin="dense"
                  onChange={onChange}
                />
              )}
              {!showMoteTotalEditors && (
                <span className={classes.separator}>
                  {character.motes_personal_total}
                </span>
              )}
            </div>
            <div className={classes.flexCol}>
              <RatingField
                trait="motes_peripheral_current"
                value={character.motes_peripheral_current}
                label="Peripheral"
                max={
                  character.motes_peripheral_total -
                  committedPeripheralMotes(character)
                }
                margin="dense"
                onChange={onChange}
              />
              <span className={classes.separator}>/</span>
              {showMoteTotalEditors && (
                <RatingField
                  trait="motes_peripheral_total"
                  value={character.motes_peripheral_total}
                  label="Total"
                  margin="dense"
                  onChange={onChange}
                />
              )}
              {!showMoteTotalEditors && (
                <span className={classes.separator}>
                  {character.motes_peripheral_total}
                </span>
              )}
            </div>
          </Fragment>
        )}
        {character.is_sorcerer && (
          <div className={classes.flexCol}>
            <RatingField
              trait="sorcerous_motes"
              value={character.sorcerous_motes}
              label="Sorcerous"
              margin="dense"
              onChange={onChange}
            />
          </div>
        )}
      </div>
      <div className={classes.flexRow}>
        {character.type !== 'Character' && (
          <div className={classes.flexCol}>
            <AnimaSelect character={character} onChange={onChange} />
          </div>
        )}

        {hasAura(character) && (
          <div className={classes.flexCol}>
            <TextField
              select
              name="aura"
              value={character.aura || ''}
              label="Aura"
              margin="dense"
              style={{ width: '8em' }}
              onChange={onChange}
            >
              {character.type !== 'DragonbloodCharacter' && (
                <MenuItem value="">Does not use Aura</MenuItem>
              )}
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="air">Air</MenuItem>
              <MenuItem value="earth">Earth</MenuItem>
              <MenuItem value="fire">Fire</MenuItem>
              <MenuItem value="water">Water</MenuItem>
              <MenuItem value="wood">Wood</MenuItem>
            </TextField>
          </div>
        )}
      </div>

      {character.type !== 'Character' && (
        <MoteCommittmentEditor character={character} onChange={onChange} />
      )}
    </BlockPaper>
  )
}
export default withStyles(styles)(MotePoolEditor)
