import parseSchema from "./parseSchema"

let seedRandom = () => {}

export const setSeedRandom = (func = () => {}) => {
  seedRandom = func
}

export class Schema {
  constructor(blueprint) {
    this.blueprint = blueprint
  }

  setSeed(seed = 0) {
    this.seed = seed
  }

  makeOne(seed) {
    if (seed || this.seed) {
      seedRandom(seed || this.seed)
    }
    if (this.seed) {
      this.seed = this.seed + 1
    }
    const schema = parseBlueprint(this.blueprint)
    return parseSchema(schema)
  }

  make(num = 1, seed) {
    const results = Array(num)
      .fill(0)
      .map((_, index) => this.makeOne(seed ? seed + index : seed))
    return results.length === 1 ? results[0] : results
  }
}
