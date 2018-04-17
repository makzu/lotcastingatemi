// @flow
import type { Character } from 'utils/flow-types'
import rating from './_rating.js'

export function resolve(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  charmAbils: Array<string>
) {
  const pen = [{ label: 'Wound', penalty: penalties.wound }]
  let bonus = []
  let wellBred = merits.find(m => m.startsWith('well-bred'))
  if (wellBred !== undefined)
    bonus = bonus.concat([{ label: 'well-bred', bonus: 1, situational: true }])

  let thinBlood = merits.find(m => m.startsWith('thin-blooded'))
  if (thinBlood !== undefined)
    bonus = bonus.concat([
      { label: 'thin-blooded', bonus: -1, situational: true },
    ])

  return rating(
    'Resolve',
    character,
    'wits',
    'integrity',
    pen,
    charmAbils,
    bonus
  )
}
export default resolve
