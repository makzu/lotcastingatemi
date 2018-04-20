// @flow
import React, { Fragment } from 'react'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import type { withSpecialties } from 'utils/flow-types'

const styles = theme => ({
  specialtyWrap: {
    display: 'flex',
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit / 2,
  },
  specialtyAbility: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
    width: '7em',
  },
  specialtyContext: {
    ...theme.typography.body1,
    flex: 1,
  },
})

type Props = { character: withSpecialties, classes: Object }
function FullSpecialtyBlock({ character, classes }: Props) {
  const spec = character.specialties.map(s => (
    <Fragment key={s.ability + s.context}>
      <div className={classes.specialtyWrap}>
        <div className={classes.specialtyAbility}>
          {s.ability === 'martial_arts' ? 'Martial Arts' : s.ability}
        </div>
        <div className={classes.specialtyContext}>{s.context}</div>
      </div>
      <Divider />
    </Fragment>
  ))

  return (
    <BlockPaper>
      <Typography variant="title">Specialties</Typography>

      {spec}
    </BlockPaper>
  )
}

export default withStyles(styles)(FullSpecialtyBlock)
