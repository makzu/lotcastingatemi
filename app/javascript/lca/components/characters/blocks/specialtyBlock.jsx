import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import { withSpecialties } from '../../../utils/propTypes'

const styles = theme => ({
  specialtyWrap: {
    display: 'flex',
  },
  specialtyAbility: { ...theme.typography.body1,
    textTransform: 'capitalize',
    width: '7em',
  },
  specialtyContext: { ...theme.typography.body1,
    flex: 1,
  }
})

function FullSpecialtyBlock({ character, classes }) {
  const spec = character.specialties.map((s) =>
    <Fragment key={s.ability + s.context}>
      <div className={ classes.specialtyWrap }>
        <div className={ classes.specialtyAbility }>
          { s.ability }
        </div>
        <div className={ classes.specialtyContext }>
          { s.context }
        </div>
      </div>
      <Divider />
    </Fragment>
  )

  return <BlockPaper>
    <Typography variant="title">
      Specialties
    </Typography>

    { spec }
  </BlockPaper>
}
FullSpecialtyBlock.propTypes = {
  character: PropTypes.shape(withSpecialties).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(FullSpecialtyBlock)
