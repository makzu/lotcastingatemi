import withStyles from '@mui/styles/withStyles'
import Divider from '@mui/material/Divider'

import RatingLine from 'components/generic/ratingLine'
import { isCasteAttribute, isFavoredAttribute } from 'utils/calculated'
import type { Character } from 'types'

const styles = (theme) => ({
  attributeName: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  attributeFavored: {
    ...theme.typography.caption,
  },
})

interface Props {
  attribute: string
  rating: number
  character: Character
  pools: Record<string, $TSFixMe>
  classes: Record<string, $TSFixMe>
}

function AttributeLine(props: Props) {
  const { rating, attribute, character, pools, classes } = props
  const caste = isCasteAttribute(character, attribute)
  const favored = isFavoredAttribute(character, attribute)
  const excellency =
    pools.excellencyAbils.includes('*') ||
    pools.excellencyAbils.includes(attribute)
  return (
    <div>
      <RatingLine rating={rating}>
        <span className={classes.attributeName}>{attribute}</span>
        <span className={classes.attributeFavored}>
          {excellency && ' *'}
          {caste && (character.aspect ? ' (a)' : ' (c)')}
          {favored && ' (f)'}
        </span>
      </RatingLine>

      <Divider />
    </div>
  )
}

export default withStyles(styles)(AttributeLine)
