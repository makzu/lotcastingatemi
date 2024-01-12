import AttributeLine from './attributeLine.jsx'
import type { Props } from './attributeBlock.jsx'

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
