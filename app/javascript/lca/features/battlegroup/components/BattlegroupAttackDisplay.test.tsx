import { render, screen } from '@testing-library/react'
import BattlegroupAttackDisplay from './BattlegroupAttackDisplay'
import type { Battlegroup as OldBattlegroup, QcAttack } from '@/types'

interface Battlegroup extends Omit<OldBattlegroup, 'qc_attacks'> {
  qc_attacks: QcAttack[]
}

describe('BattlegroupAttackDisplay', () => {
  const battlegroup: Partial<Battlegroup> = {
    // mock battlegroup data
  }

  const attack: Partial<QcAttack> = {
    name: 'Swords',
    tags: [],
    // mock attack data
  }

  it('renders the attack name', () => {
    render(
      <BattlegroupAttackDisplay
        battlegroup={battlegroup as Battlegroup}
        attack={attack as QcAttack}
      />,
    )
    const nameElement = screen.getByText(attack.name!)
    expect(nameElement).toBeInTheDocument()
  })

  // Add more test cases for other components and functionalities
})
