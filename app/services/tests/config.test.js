import { deleteUser, PRIVATE_API_ROOT } from '../config'

describe('Services config - deleteUser', () => {
  it('should generate correct URL from token sub', () => {
    // JWT with sub: '1234567890abcdef' (payload: {"sub":"1234567890abcdef"})
    // Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // Payload: eyJzdWIiOiIxMjM0NTY3ODkwYWJjZGVmIn0
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwYWJjZGVmIn0.signature'
    const url = deleteUser.url(fakeToken)
    expect(url).toBe(`${PRIVATE_API_ROOT}/users/1234567890abcdef`)
  })

  it('should generate correct options for DELETE request', () => {
    const options = deleteUser.options()
    expect(options).toEqual({
      config: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      },
    })
  })
})
