import { Schema } from '../Schema'
import faker from 'faker'

describe('Schema', () => {
  const blueprint = { firstName: 'Bob', lastName: 'Belcher' }

  const fakerBlueprint = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })

  test('makeOne returns an empty schema by default', () => {
    const schema = new Schema()
    expect(schema.makeOne()).toEqual({})
  })

  test('make returns an empty array by default', () => {
    const schema = new Schema()
    expect(schema.make()).toEqual([])
  })

  test('returns a single schema identical to blueprint by default', () => {
    const personSchema = new Schema(blueprint)
    expect(personSchema.makeOne()).toEqual(blueprint)
  })

  test('returns schemas identical to blueprint by default', () => {
    const personSchema = new Schema(blueprint)
    const results = personSchema.make(5)
    expect(results).toHaveLength(5)
    results.forEach(result => expect(result).toEqual(blueprint))
  })

  test('returns a randomized schema when using Faker', () => {
    const personSchema = new Schema(fakerBlueprint)
    const person1 = personSchema.makeOne()
    const person2 = personSchema.makeOne()
    expect(person1).not.toEqual(personSchema)
    expect(person2).not.toEqual(personSchema)
    expect(person1.firstName).toBeDefined()
    expect(person1.lastName).toBeDefined()
    expect(person2.firstName).toBeDefined()
    expect(person2.lastName).toBeDefined()
    expect(person1).not.toEqual(person2)
  })

  test('returns a randomized schema with derived data when using faker', () => {
    const personSchema = new Schema({
      ...fakerBlueprint,
      firstName: 'Bob',
      lastName: 'Belcher',
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`
    })
    const people = personSchema.make(1)
    expect(people[0].fullName).toEqual('Bob Belcher')
  })

  test('returns the same randomized sequence when using Faker and seeded', () => {
    const personSchema = new Schema(fakerBlueprint)
    personSchema.setSeed(5)
    expect(personSchema.seed).toEqual(5)
    const person1A = personSchema.makeOne()
    const person2A = personSchema.makeOne()
    personSchema.setSeed(5)
    expect(personSchema.seed).toEqual(5)
    const person1B = personSchema.makeOne()
    const person2B = personSchema.makeOne()
    expect(person1A).toEqual(person1B)
    expect(person2A).toEqual(person2B)
    personSchema.setSeed(5)
    const people = personSchema.make(2)
    expect(people[0]).toEqual(person1B)
    expect(people[1]).toEqual(person2B)
  })

  test('returns the same results when invoked with seed argument', () => {
    const personSchema = new Schema(fakerBlueprint)
    const person1 = personSchema.makeOne(123)
    const person2 = personSchema.makeOne(124)
    const people = personSchema.make(2, 123)
    expect(people[0]).toEqual(person1)
    expect(people[1]).toEqual(person2)
  })

  test('seed is set to one by default if no argument provided to setSeed', () => {
    const personSchema = new Schema(fakerBlueprint)
    expect(personSchema.seed).toBeUndefined()
    personSchema.setSeed()
    expect(personSchema.seed).toEqual(1)
  })
})
