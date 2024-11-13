import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '@/store'

const AllWrappers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllWrappers,
    ...options,
  })
}

export const ex3ReleaseDate = new Date('2016-04-20')

export * from '@testing-library/react'
//export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
