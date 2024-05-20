import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Provider } from 'react-redux'

import store from '@/store'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  })
}

export * from '@testing-library/react'
//export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
