// Global setup run by everything vitest wants to run

import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
})
