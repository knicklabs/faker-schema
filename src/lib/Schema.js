import faker from "faker"

import { postProcessSchema } from "./postProcessSchema"

export class Schema {
  constructor(blueprint = () => ({})) {
    this.blueprint = blueprint
    this.seed = undefined
  }

  setSeed(seed = 0) {
    this.seed = seed
  }

  makeOne(seed) {
    if (seed || this.seed) {
      faker.seed(seed || this.seed)
    }

    const schema = this.blueprint()
    if (this.seed) {
      this.seed = this.seed + 1
    }

    return postProcessSchema(schema)
  }

  make(num = 1, seed) {
    const results = Array(num)
      .fill(0)
      .map((_, index) => this.makeOne(seed ? seed + index : seed))
    return results.length === 1 ? results[0] : results
  }
}
