import { postProcessSchema } from '../utils'

describe('postProcessSchema', () => {
  test('returns an empty object by default', () => {
    expect(postProcessSchema()).toEqual({})
  })

  test('returns a shallow copy of a schema', () => {
    const schema = { 
      firstName: 'Bob', 
      lastName: 'Belcher', 
      jobTitle: null, 
      tags: ['entrepreneur', 'parent'] 
    }
    expect(postProcessSchema(schema)).toEqual(schema)
  })

  test('returns a deep copy of a schema', () => {
    const schema = {
      firstName: 'Bob',
      lastName: 'Belcher',
      address: {
        city: 'San Francisco'
      }
    }
    expect(postProcessSchema(schema)).toEqual(schema)
  })

  test('invokes derived data callbacks at any depth with root schema', () => {
    const spies = [jest.fn(), jest.fn(), jest.fn()]
    const schema = {
      spy0: spies[0],
      more: {
        spy1: spies[1],
        more: {
          spy2: spies[2],
        }
      }
    }
    postProcessSchema(schema)
    spies.forEach(spy => expect(spy).toHaveBeenCalledWith(schema))
  })

  test('returns a copy of schema with derived data', () => {
    const schema = {
      firstName: 'Bob',
      lastName: 'Belcher',
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      address: {
        city: 'San Francisco',
        country: 'United States',
        fullAddress: ({ address: { city, country } }) => `${city}, ${country}`
      },
      shippingLabel: ({ firstName, lastName, address: { city, country } }) =>
        `${firstName} ${lastName}, ${city}, ${country}`
    }
    const result = postProcessSchema(schema)
    expect(result.fullName).toEqual('Bob Belcher')
    expect(result.address.fullAddress).toEqual('San Francisco, United States')
    expect(result.shippingLabel).toEqual(
      'Bob Belcher, San Francisco, United States'
    )
  })
})
