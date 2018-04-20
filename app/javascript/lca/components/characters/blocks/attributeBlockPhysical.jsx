// @flow
import React from 'react'

import AttributeLine from './attributeLine.jsx'
import type { Props } from './attributeBlock.jsx'

function AttributeBlockPhysical({ character, pools }: Props) {
  return (
    <div>
      <AttributeLine
        attribute="strength"
        rating={character.attr_strength}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="dexterity"
        rating={character.attr_dexterity}
        character={character}
        pools={pools}
      />
      <AttributeLine
        attribute="stamina"
        rating={character.attr_stamina}
        character={character}
        pools={pools}
      />
    </div>
  )
}

export default AttributeBlockPhysical
