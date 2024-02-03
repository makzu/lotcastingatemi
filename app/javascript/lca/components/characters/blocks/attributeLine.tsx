import { Divider, Typography } from '@mui/material'

import RatingLine from '@/components/generic/ratingLine'
import type { Character } from '@/types'
import { isCasteAttribute, isFavoredAttribute } from '@/utils/calculated'

interface Props {
  attribute: string
  rating: number
  character: Character
  pools: Record<string, $TSFixMe>
}

function AttributeLine(props: Props) {
  const { rating, attribute, character, pools } = props
  const caste = isCasteAttribute(character, attribute)
  const favored = isFavoredAttribute(character, attribute)
  const excellency =
    pools.excellencyAbils.includes('*') ||
    pools.excellencyAbils.includes(attribute)

  return (
    <div>
      <RatingLine rating={rating}>
        <Typography component="span" className="capitalize">
          {attribute}
        </Typography>
        <Typography component="span" variant="caption">
          {excellency && ' *'}
          {caste && (character.aspect ? ' (a)' : ' (c)')}
          {favored && ' (f)'}
        </Typography>
      </RatingLine>

      <Divider />
    </div>
  )
}

export default AttributeLine
