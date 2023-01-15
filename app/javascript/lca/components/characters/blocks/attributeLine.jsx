// @flow
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import RatingLine from 'components/generic/ratingLine.jsx'
import { isCasteAttribute, isFavoredAttribute } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

const styles = (theme) => ({
  attributeName: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  attributeFavored: {
    ...theme.typography.caption,
  },
})

type Props = {
  attribute: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
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
