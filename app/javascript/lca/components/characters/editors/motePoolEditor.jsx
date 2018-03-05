import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/ratingField.jsx'

const styles = theme => ({
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
})

function MotePoolEditor(props) {
  const { character, onRatingChange, classes } = props

  const showMoteTotalEditors = false

  return <BlockPaper>
    <Typography variant="title">Mote Pools:</Typography>

    { character.type != 'Character' && [
      <div key="personal">
        <RatingField trait="motes_personal_current" value={ character.motes_personal_current }
          label="Personal" max={ character.motes_personal_total } margin="dense"
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
          label="Peripheral" max={ character.motes_peripheral_total } margin="dense"
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
      <div key="anima">
        <TextField select name="anima_level" value={ character.anima_level }
          label="Anima" margin="dense"
          onChange={ onRatingChange }
        >
          <MenuItem value={ 0 }>Dim</MenuItem>
          <MenuItem value={ 1 }>Glowing</MenuItem>
          <MenuItem value={ 2 }>Burning</MenuItem>
          <MenuItem value={ 3 }>Bonfire</MenuItem>
        </TextField>
      </div>
    ] }

    <div>
      <RatingField trait="sorcerous_motes" value={ character.sorcerous_motes }
        label="Sorcerous" margin="dense"
        onChange={ onRatingChange }
      />
    </div>
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
