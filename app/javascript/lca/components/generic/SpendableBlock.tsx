import { Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import AnimaDisplay from '../displays/AnimaDisplay'
import AuraDisplay from '../displays/AuraDisplay'
import DamageWidget from '../generic/DamageWidget'
import HealthLevelBoxes from '../generic/HealthLevelBoxes'
import MoteSpendWidget from '../generic/MoteSpendWidget'
import ResourceDisplay from '../generic/ResourceDisplay'
import ShapeSorceryWidget from '../generic/ShapeSorceryWidget'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget'
import sharedStyles from '@/styles/'
import * as calc from '@/utils/calculated'
import { Character, QC } from '@/types'

const styles = (theme) => ({
  ...sharedStyles(theme),
  moteWrap: {
    marginRight: theme.spacing(),
  },
})

interface Props extends WithStyles<typeof styles> {
  character: Character | QC
  qc?: boolean
}
export function SpendableBlock({ character, classes, qc }: Props) {
  return (
    <>
      <Typography className="flexContainerWrap" component="div" sx={{ gap: 1 }}>
        {character.motes_personal_total > 0 && (
          <MoteSpendWidget character={character} qc={qc}>
            <ResourceDisplay
              className={classes.moteWrap}
              current={character.motes_personal_current}
              total={character.motes_personal_total}
              committed={calc.committedPersonalMotes(character)}
              label="Personal"
            />
          </MoteSpendWidget>
        )}
        {character.motes_peripheral_total > 0 && (
          <MoteSpendWidget character={character} peripheral qc={qc}>
            <ResourceDisplay
              className={classes.moteWrap}
              current={character.motes_peripheral_current}
              total={character.motes_peripheral_total}
              committed={calc.committedPeripheralMotes(character)}
              label="Peripheral"
            />
          </MoteSpendWidget>
        )}
        {character.is_sorcerer && (
          <ShapeSorceryWidget character={character} qc={qc}>
            <ResourceDisplay
              className={classes.moteWrap}
              current={character.sorcerous_motes}
              label="Sorcerous"
            />
          </ShapeSorceryWidget>
        )}
        <WillpowerSpendWidget character={character} qc={qc}>
          <ResourceDisplay
            className={classes.moteWrap}
            current={character.willpower_temporary}
            total={character.willpower_permanent}
            label="Willpower"
          />
        </WillpowerSpendWidget>

        <AuraDisplay character={character} qc={qc} />
        <AnimaDisplay character={character} qc={qc} />
      </Typography>

      <DamageWidget character={character} qc={qc}>
        <HealthLevelBoxes character={character} />
      </DamageWidget>
    </>
  )
}
export default withStyles(styles)(SpendableBlock)
