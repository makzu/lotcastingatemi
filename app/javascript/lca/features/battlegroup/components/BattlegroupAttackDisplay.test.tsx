import { render, screen } from '@testing-library/react'

import type { QcAttack } from '@/types'
import type { Battlegroup } from '../types'
import BattlegroupAttackDisplay from './BattlegroupAttackDisplay'

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
