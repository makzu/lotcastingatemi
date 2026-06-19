import { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import { getSpellsForCharacter } from '@lca/ducks/entities'
import { useAppSelector } from '@lca/hooks'
import type { Character, Spell } from '@lca/types'
import { type CharmFilter, filterCharms } from '../Charms/useCharmFilters'
import FullSpellDisplay from '../Sorcery/FullSpell'

interface ExposedProps {
  id: Character['id']
  filters: CharmFilter
}

const SpellList = (props: ExposedProps) => {
  const [openSpell, setOpenSpell] = useState<Spell['id']>(0)
  const spells = useAppSelector((state) =>
    getSpellsForCharacter(state, props.id),
  )

  const filteredSpells = filterCharms(spells, props.filters, 'spell') as Spell[]
  const mappedSpells = filteredSpells.map((s) => (
    <Grid item xs={12} md={6} xl={4} key={s.id}>
      <FullSpellDisplay
        spell={s}
        isOpen={openSpell === s.id}
        setOpenSpell={setOpenSpell}
      />
    </Grid>
  ))

  return <>{mappedSpells}</>
}

export default SpellList
