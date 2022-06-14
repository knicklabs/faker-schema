import { withProbability } from '../helpers'
import { faker } from '@faker-js/faker'

describe('withProbability', () => {
  test('result evaluates to null if probability is <= zero', () => {
    const results = [withProbability('dog', 0), withProbability('dog', -100)]
    results.forEach(result => expect(result()).toEqual(null))
  })

  test('result evaluates to value if probability is >= one', () => {
    const results = [withProbability('dog', 1), withProbability('dog', 100)]
    results.forEach(result => expect(result()).toEqual('dog'))
  })

  test('probability is set to 1 by default', () => {
    expect(withProbability('dog')()).toEqual('dog')
  })

  test('value is invoked if it is a function', () => {
    const schema = { animal: 'dog' }
    const spy = jest.fn()
    withProbability(spy, 1)(schema)
    expect(spy).toHaveBeenCalledWith(schema)
  })

  test('result evaluates to value about half the time', () => {
    faker.seed(123)
    const results = Array(1000).fill(0).map(_ => withProbability('dog', 0.5)())
    const values = results.filter(val => val !== null)
    const percent = parseInt((values.length / results.length) * 100, 10)
    expect(percent >= 47 && percent <= 53).toBe(true)
  })
})
