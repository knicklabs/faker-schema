import { Schema } from '../Schema'
import faker from 'faker'

describe('Schema', () => {
  const blueprint = { firstName: 'Bob', lastName: 'Belcher' }

  const fakerBlueprint = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })

  describe('make', () => {
    test('make returns a single schema identical to blueprint by default', () => {
      const personSchema = new Schema(blueprint)
      expect(personSchema.make()).toEqual(blueprint)
    })
  
    test('make returns schemas identical to blueprint by default', () => {
      const personSchema = new Schema(blueprint)
      const results = personSchema.make(5)
      expect(results).toHaveLength(5)
      results.forEach(result => expect(result).toEqual(blueprint))
    })

    test('make returns a randomized schema when using Faker', () => {
      const personSchema = new Schema(fakerBlueprint)
      const person1 = personSchema.make()
      const person2 = personSchema.make()
      expect(person1).not.toEqual(personSchema)
      expect(person2).not.toEqual(personSchema)
      expect(person1.firstName).toBeDefined()
      expect(person1.lastName).toBeDefined()
      expect(person2.firstName).toBeDefined()
      expect(person2.lastName).toBeDefined()
      expect(person1).not.toEqual(person2)
    })

    test('make returns the same randomized sequence when using Faker and seeded', () => {
      const personSchema = new Schema(fakerBlueprint)
      personSchema.setSeed(5)
      expect(personSchema.seed).toEqual(5)
      const person1A = personSchema.make()
      const person2A = personSchema.make()
      personSchema.setSeed(5)
      expect(personSchema.seed).toEqual(5)
      const person1B = personSchema.make()
      const person2B = personSchema.make()
      expect(person1A).toEqual(person1B)
      expect(person2A).toEqual(person2B)
      personSchema.setSeed(5)
      const people = personSchema.make(2)
      expect(people[0]).toEqual(person1B)
      expect(people[1]).toEqual(person2B)
    })
  })
})
