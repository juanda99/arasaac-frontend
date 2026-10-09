import api from '../index'
import { PRIVATE_API_ROOT } from '../config'

describe('Services API - WORLD_REQUEST', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('should call PRIVATE_API_ROOT/world', async () => {
    const mockLocations = [
      {
        id: 1,
        name: 'Centro Test',
        tipo: 'Colegio',
        latitude: 40,
        longitude: -3,
        status: 1,
      },
    ]

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockLocations),
      }),
    )

    const result = await api.WORLD_REQUEST()
    expect(global.fetch).toHaveBeenCalledWith(`${PRIVATE_API_ROOT}/world`, {})
    expect(result).toEqual(mockLocations)
  })
})
