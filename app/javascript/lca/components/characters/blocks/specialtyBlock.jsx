// @flow
import { Fragment } from 'react'

import withStyles from '@mui/styles/withStyles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import BlockPaper from 'components/shared/BlockPaper'
import type { withSpecialties } from 'utils/flow-types'

const styles = (theme) => ({
  specialtyWrap: {
    display: 'flex',
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
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
  const spec = character.specialties.map((s) => (
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
      <Typography variant="h6">Specialties</Typography>

      {spec}
    </BlockPaper>
  )
}

export default withStyles(styles)(FullSpecialtyBlock)
