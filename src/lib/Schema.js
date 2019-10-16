import faker from "faker"

import { preProcessSchema, postProcessSchema } from "./utils"

export class Schema {
  constructor(blueprint = () => ({})) {
    this.blueprint = blueprint
    this.seed = undefined
  }

  setSeed(seed = 1) {
    this.seed = seed
  }

  makeOne(seed) {
    if (seed || this.seed) {
      faker.seed(seed || this.seed)
    }

    const schema = typeof this.blueprint === 'function'
      ? this.blueprint()
      : this.blueprint
    
    if (this.seed) {
      this.seed = this.seed + 1
    }

    return postProcessSchema(preProcessSchema(schema))
  }

  make(num = 0, seed) {
    return Array(num)
      .fill(0)
      .map((_, index) => this.makeOne(seed ? seed + index : seed))
  }
}
