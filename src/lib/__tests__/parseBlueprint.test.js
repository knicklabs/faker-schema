import parseBlueprint from '../parseBlueprint'

describe('parseBlueprint', () => {
  test('returns an empty object by default', () => {
    expect(parseBlueprint()).toEqual({})
  })
})