import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import BlockPaper from './blockPaper.jsx'
import SpecialtyPopup from '../editors/specialtyPopup.jsx'
import { withSpecialties } from '../../../utils/propTypes'

const styles = theme => ({
  specialtyAbility: { ...theme.typography.body1,
    textTransform: 'capitalize',
    display: 'inline-block',
    width: '7em',
  },
  specialtyContext: { ...theme.typography.body1,

  }
})

function FullSpecialtyBlock(props) {
  const spec = props.character.specialties.map((s) =>
    <div key={s.ability + s.context}>
      <span className={ props.classes.specialtyAbility }>
        { s.ability }
      </span>
      <span className={ props.classes.specialtyContext }>
        { s.context }
      </span>
      <Divider />
    </div>
  )

  return <BlockPaper>
    <Typography variant="title">
      Specialties
      <SpecialtyPopup character={ props.character } />
    </Typography>

    { spec }
  </BlockPaper>
}
FullSpecialtyBlock.propTypes = {
  character: PropTypes.shape(withSpecialties).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(FullSpecialtyBlock)
