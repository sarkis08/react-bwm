
const minLength = min => value =>
value && value.length < min ? `Password must be ${min} characters or more!` : undefined

export const minLength6 = minLength(6)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address!'
    : undefined

export const required = value => (value ? undefined : 'This input is required!')