import { test, expect, vi } from 'vitest'
import CorsError from '../errors/CorsError'
import TimedOutError from '../errors/TimedOutError'

export default (header, connector, params) => {
  test(header + ' CORS error', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.reject(new CorsError())
    })
    await expect(connector(fetch)(...params)).rejects.toThrowError('Failed to fetch CORS error, please contact support')
  })

  test(header + ' TimedOut error', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.reject(new TimedOutError(500))
    })
    await expect(connector(fetch)(...params)).rejects.toThrowError('Request timed out. Retry later.')
  })
}
