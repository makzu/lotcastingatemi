// @flow
import React, { Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
  animaLabel: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  animaCurrent: {
    ...theme.typography.display1,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  animaValue: {
    ...theme.typography.body1,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
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
        {character.type != 'Character' && (
          <div className={classes.moteWrap}>
            <div className={classes.animaLabel}>Anima</div>
            <div>
              <span className={classes.animaCurrent}>
                {calc.prettyAnimaLevel(character.anima_level)}
              </span>
              {character.anima_level > 0 && (
                <span className={classes.animaValue}>
                  &nbsp;({character.anima_level})
                </span>
              )}
            </div>
          </div>
        )}
      </Typography>

      <DamageWidget character={character} qc={qc}>
        <HealthLevelBoxes character={character} />
      </DamageWidget>
    </Fragment>
  )
}

export default withStyles(styles)(SpendableBlock)
