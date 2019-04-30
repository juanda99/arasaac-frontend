// validation functions
export const required = (value) => (value == null ? 'Required' : undefined)
export const email = (value) => {
  if (!value) return false
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}
