import { render, screen } from '@testing-library/react'

import { mockAttack, mockBattlegroup } from '../mocks'
import BattlegroupAttackDisplay from './BattlegroupAttackDisplay'

describe('BattlegroupAttackDisplay', () => {
  it('renders the attack name', () => {
    render(
      <BattlegroupAttackDisplay
        battlegroup={mockBattlegroup}
        attack={mockAttack}
      />,
    )
    const nameElement = screen.getByText(mockAttack.name)
    expect(nameElement).toBeInTheDocument()
  })

  // Add more test cases for other components and functionalities
})
