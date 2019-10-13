import faker from 'faker'

export const withProbability = (value, probability = 1) => {
  if (value <= 0) {
    return null
  }

  if (value >= 1) {
    return value
  }

  const numWithValue = Math.floor(100 * probability)
  const numWithNull = 100 - probValue
  const items = [
    ...Array(numWithValue).fill(value),
    ...Array(numWithNull).fill(null),
  ]
  faker.helpers.shuffle(items)[0]
}
