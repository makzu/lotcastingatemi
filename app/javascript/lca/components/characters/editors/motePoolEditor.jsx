import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import MoteCommittmentEditor from './moteCommittmentEditor.jsx'
import AnimaSelect from '../../generic/AnimaSelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/RatingField.jsx'
import { committedPersonalMotes, committedPeripheralMotes, hasAura } from '../../../utils/calculated'

const styles = theme => ({
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
})

function MotePoolEditor(props) {
  const { character, onRatingChange, classes } = props

  if (character.type == 'Character' && !character.is_sorcerer)
    return <div />

  const showMoteTotalEditors = character.type == 'CustomAttributeCharacter' || character.type == 'CustomAbilityCharacter' || character.type == 'CustomEssenceCharacter'

  return <BlockPaper>
    <Typography variant="title">Mote Pools:</Typography>

    { character.type != 'Character' && [
      <div key="personal">
        <RatingField trait="motes_personal_current" value={ character.motes_personal_current }
          label="Personal" max={ character.motes_personal_total - committedPersonalMotes(character) } margin="dense"
          onChange={ onRatingChange }
        />
        <span className={ classes.separator }>
          /
        </span>
        { showMoteTotalEditors &&
          <RatingField trait="motes_personal_total" value={ character.motes_personal_total }
            label="Total" margin="dense"
            onChange={ onRatingChange }
          />
        }
        { !showMoteTotalEditors &&
          <span className={ classes.separator }>
            { character.motes_personal_total }
          </span>
        }
      </div>,
      <div key="peripheral">
        <RatingField trait="motes_peripheral_current" value={ character.motes_peripheral_current }
          label="Peripheral" max={ character.motes_peripheral_total - committedPeripheralMotes(character) } margin="dense"
          onChange={ onRatingChange }
        />
        <span className={ classes.separator }>
          /
        </span>
        { showMoteTotalEditors &&
          <RatingField trait="motes_peripheral_total" value={ character.motes_peripheral_total }
            label="Total" margin="dense"
            onChange={ onRatingChange }
          />
        }
        { !showMoteTotalEditors &&
          <span className={ classes.separator }>
            { character.motes_peripheral_total }
          </span>
        }
      </div>,
      <MoteCommittmentEditor key="commit"
        character={ character } onChange={ onRatingChange }
      />,
      <div key="anima">
        <AnimaSelect character={ character } onChange={ onRatingChange } />
      </div>
    ] }
    { hasAura(character) &&
      <TextField select name="aura" value={ character.aura }
        label="Aura"
        margin="dense" style={{ width: '8em' }}
        onChange={ onRatingChange }
        SelectProps={{ showBlank: true }}
      >
        <MenuItem value="">No active Aura</MenuItem>
        <MenuItem value="air">Air</MenuItem>
        <MenuItem value="earth">Earth</MenuItem>
        <MenuItem value="fire">Fire</MenuItem>
        <MenuItem value="water">Water</MenuItem>
        <MenuItem value="wood">Wood</MenuItem>
      </TextField>
    }

    { character.is_sorcerer && <div>
      <RatingField trait="sorcerous_motes" value={ character.sorcerous_motes }
        label="Sorcerous" margin="dense"
        onChange={ onRatingChange }
      />
    </div> }
  </BlockPaper>

}
MotePoolEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onRatingChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}


export default withStyles(styles)(MotePoolEditor)
