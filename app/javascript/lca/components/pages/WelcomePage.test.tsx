import { render, screen } from 'testUtils'
import WelcomePage from './WelcomePage'

it('can render', () => {
  render(<WelcomePage />)

  expect(screen.getByText('Lot-Casting Atemi')).toBeInTheDocument()
})
