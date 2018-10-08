// @flow
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import WeaponPoolDisplay from '../weapons/WeaponPoolDisplay.jsx'
import commonStyles from 'styles'
import type { fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  ...commonStyles(theme),
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    height: '2.5em',
    width: '5em',
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  name: {
    ...theme.typography.body2,
    width: '10rem',
    margin: theme.spacing.unit,
    marginLeft: 0,
    maxHeight: '5rem',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  artifactLabel: {
    ...theme.typography.caption,
  },
  tags: {
    ...theme.typography.body1,
    margin: theme.spacing.unit,
    marginLeft: 0,
    flex: 1,
    minWidth: '10rem',
    textTransform: 'capitalize',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
  notes: {
    width: '100%',
  },
})

type Props = {
  weapon: fullWeapon,
  classes: Object,
}
function WeaponLine({ weapon, classes }: Props) {
  let artifactLabel
  if (weapon.is_artifact && !weapon.tags.includes('elemental bolt'))
    artifactLabel = <div className={classes.artifactLabel}>Artifact</div>
  else if (weapon.tags.includes('elemental bolt'))
    artifactLabel = <div className={classes.artifactLabel}>Elemental Bolt</div>

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <div className={classes.label}>
          <span className={classes.labelSpan}>Name</span>
        </div>
        {weapon.name}
        {artifactLabel}
      </div>

      {/* $FlowFixMe */}
      <WeaponPoolDisplay weapon={weapon} />

      <div className={classes.tags}>
        <div className={classes.label}>
          <span className={classes.labelSpan}>Tags</span>
        </div>
        {weapon.tags.join(', ') || 'none'}
      </div>

      {weapon.notes !== '' && (
        <div className={classes.notes}>
          <Typography
            component={ReactMarkdown}
            source={weapon.notes}
            className={classes.markdown}
            allowedTypes={['text', 'strong', 'emphasis', 'delete', 'link']}
            unwrapDisallowed
          />
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(WeaponLine)
