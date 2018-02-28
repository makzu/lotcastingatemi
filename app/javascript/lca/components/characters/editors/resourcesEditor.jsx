import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import HealthLevelBoxes from '../../generic/HealthLevelBoxes.jsx'
import RatingField from '../../generic/ratingField.jsx'

import { ESSENCE_MIN, ESSENCE_MAX } from '../../../utils/constants.js'

function ResourcesEditor(props) {
  const { character, onChange, onBlur, onRatingChange } = props

  return <BlockPaper>
    <div>
      <Typography variant="subheading">Willpower:</Typography>
      <RatingField trait="willpower_temporary" value={ character.willpower_temporary }
        label="Current"
        onChange={ onRatingChange }
      />
      /
      <RatingField trait="willpower_permanent" value={ character.willpower_permanent }
        label="Total"
        onChange={ onRatingChange }
      />
    </div>
    { character.type != 'Character' &&
      <div>
        <Typography variant="subheading">Mote Pools:</Typography>
        <RatingField trait="motes_personal_current" value={ character.motes_personal_current }
          label="Personal" max={ character.motes_personal_total }
          onChange={ onRatingChange }
        />
        /
        <RatingField trait="motes_personal_total" value={ character.motes_personal_total }
          onChange={ onRatingChange }
        />
        &nbsp;
        <RatingField trait="motes_peripheral_current" value={ character.motes_peripheral_current }
          label="Peripheral" max={ character.motes_peripheral_total }
          onChange={ onRatingChange }
        />
        /
        <RatingField trait="motes_peripheral_total" value={ character.motes_peripheral_total }
          onChange={ onRatingChange }
        />
      </div>
    }
    <div>
      <Typography variant="subheading">
        Health:
      </Typography>
      <HealthLevelBoxes character={ character } />
      <div>
        <RatingField trait="health_level_0s" value={ character.health_level_0s }
          label="0"
          onChange={ onRatingChange } />
        <RatingField trait="health_level_1s" value={ character.health_level_1s }
          label="-1"
          onChange={ onRatingChange } />
        <RatingField trait="health_level_2s" value={ character.health_level_2s }
          label="-2"
          onChange={ onRatingChange } />
        <RatingField trait="health_level_4s" value={ character.health_level_4s }
          label="-4"
          onChange={ onRatingChange } />
        <RatingField trait="health_level_incap" value={ character.health_level_incap }
          label="Incap"
          onChange={ onRatingChange } />
      </div>
      <Typography variant="subheading">
        Damage:
      </Typography>
      <div>
        <RatingField trait="damage_bashing" value={ character.damage_bashing }
          label="Bashing"
          onChange={ onRatingChange } />
        <RatingField trait="damage_lethal" value={ character.damage_lethal }
          label="Lethal"
          onChange={ onRatingChange } />
        <RatingField trait="damage_aggravated" value={ character.damage_aggravated }
          label="Aggravated"
          onChange={ onRatingChange } />
      </div>
    </div>

  </BlockPaper>

}
ResourcesEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
}


export default ResourcesEditor
