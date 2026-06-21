import type { Props } from './AttributeBlock.tsx'
import AttributeLine from './AttributeLine.tsx'

function AttributeBlockMental({ character, pools }: Props) {
  return (
    <div>
      <AttributeLine
        attribute="perception"
        rating={character.attr_perception}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="intelligence"
        rating={character.attr_intelligence}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="wits"
        rating={character.attr_wits}
        character={character}
        pools={pools}
      />
    </div>
  )
}

export default AttributeBlockMental
