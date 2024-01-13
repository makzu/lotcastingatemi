import { render, screen } from 'testUtils'
import PrivacyPage from './PrivacyPage'

it('can render', () => {
  render(<PrivacyPage />)

  expect(
    screen.getByText('Privacy Policy and Legal Mumbo-Jumbo'),
  ).toBeInTheDocument()
})
