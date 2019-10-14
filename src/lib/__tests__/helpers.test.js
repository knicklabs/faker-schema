import { withProbability } from '../helpers'
import faker from 'faker'

describe('withProbability', () => {
  test('result evaluates to null if value is <= zero', () => {
    const results = [withProbability('dog', 0), withProbability('dog', -100)]
    results.forEach(result => expect(result()).toEqual(null))
  })

  test('result evaluates to value if value is >= one', () => {
    const results = [withProbability('dog', 1), withProbability('dog', 100)]
    results.forEach(result => expect(result()).toEqual('dog'))
  })

  test('result evaluates to value about half the time', () => {
    faker.seed(123)
    const results = Array(1000).fill(0).map(_ => withProbability('dog', 0.5)())
    const values = results.filter(val => val !== null)
    const percent = parseInt((values.length / results.length) * 100, 10)
    expect(percent >= 49 && percent <= 51).toBe(true)
  })
})
