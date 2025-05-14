// tests/setup.ts
import '@testing-library/jest-dom' // if you want jest-dom matchers everywhere
import {server} from '@mocks/server'
import {afterAll, afterEach, beforeAll, beforeEach, vi} from 'vitest'

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    vi.restoreAllMocks()     // restore console.error, etc.
})
afterAll(() => server.close())

// silence runtime errors in the console so your test output stays clean
beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    })
})
