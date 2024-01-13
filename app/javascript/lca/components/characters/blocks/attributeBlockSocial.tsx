import AttributeLine from './attributeLine'
import type { Props } from './attributeBlock'

function AttributeBlockSocial({ character, pools }: Props) {
  return (
    <div>
      <AttributeLine
        attribute="charisma"
        rating={character.attr_charisma}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="manipulation"
        rating={character.attr_manipulation}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="appearance"
        rating={character.attr_appearance}
        character={character}
        pools={pools}
      />
    </div>
  )
}

export default AttributeBlockSocial
