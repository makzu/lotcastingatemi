// @flow
import React, { Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import AnimaDisplay from '../generic/AnimaDisplay.jsx'
import AuraDisplay from '../generic/AuraDisplay.jsx'
import DamageWidget from '../generic/DamageWidget.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import ShapeSorceryWidget from '../generic/ShapeSorceryWidget.jsx'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget.jsx'
import * as calc from 'utils/calculated'
import type { Character, fullQc } from 'utils/flow-types'

const styles = theme => ({
  moteWrap: {
    marginRight: theme.spacing.unit,
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

type Props = {
  character: Character | fullQc,
  classes: Object,
  qc?: boolean,
}
export function SpendableBlock({ character, classes, qc }: Props) {
  return (
    <Fragment>
      <Typography className={classes.rowContainer} component="div">
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
        <div className={classes.moteWrap}>
          <AuraDisplay character={character} qc={qc} />
          <AnimaDisplay character={character} qc={qc} />
        </div>
      </Typography>

      <DamageWidget character={character} qc={qc}>
        <HealthLevelBoxes character={character} />
      </DamageWidget>
    </Fragment>
  )
}

export default withStyles(styles)(SpendableBlock)
