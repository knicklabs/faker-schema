# faker-schema

> Create deterministic schemas with Faker

[![Build Status](https://travis-ci.org/knicklabs/faker-schema.svg?branch=master)](https://travis-ci.org/knicklabs/faker-schema)
[![Coverage Status](https://coveralls.io/repos/github/knicklabs/faker-schema/badge.svg)](https://coveralls.io/github/knicklabs/faker-schema)
[![npm version](https://badge.fury.io/js/faker-schema.svg)](https://badge.fury.io/js/faker-schema)
![dependencies](https://david-dm.org/knicklabs/faker-schema.svg)
![node](https://img.shields.io/badge/node-12x-blue.svg)
![node](https://img.shields.io/badge/node-10x-blue.svg)
![Code of Conduct](https://img.shields.io/badge/%E2%88%9A-Code%20of%20Conduct-purple.svg)

## Introduction

This library, `faker-schema`, provides a neat API around `faker` to deterministically create one or more pseduo-random records from schemas with advanced features like derived values and probability.

## Installation

```
npm i faker-schema
```

## Usage

### Basic Usage

The Schema class is used to create schemas from a blueprint. A blueprint is a function that returns an object literal.

Instatiate a new Schema with a blueprint:

```
const faker = require('faker')
const { Schema } = require('faker-schema')

const personSchema = new Schema(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: {
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    postalCode: faker.address.zipCode(),
  }
}))
```

Make a random person from the schema:

```
const person = personSchema.makeOne()
```

Example output from `console.log(person)`:

```
{
  "firstName": "Amira",
  "lastName": "Hintz",
  "address": {
    "streetAddress": "64724 Reinhold Plaza",
    "city": "Jastport",
    "state": "Georgia",
    "country": "Rwanda",
    "postalCode": "16974-6122"
  }
} 
```

Make an array of five random people from the schema:

```
const people = personSchema.make(5)
```

You can seed the schema which will result in a deterministic sequence:

```
personSchema.setSeed(123)
```

But an even better approach is to pass the optional seed argument to the
`makeOne` and `make` methods:

```
const seed = 123
const person = personSchema.makeOne(seed)
const people = personSchema.make(5, seed)
```

The above techinique is deterministic. The same random record will be returned if the methods are called again with the same seed.

If you seed the `make` method, the nth item in the array will have a seed of `seed + n - 1`. This means if you seed `make` with 2, such as `make(5, 2)`, then `makeOne(2)` will return the first item from the result of `make` and `makeOne(3)` will return the second item from the result of `make`, and so on.

Tip: Because of the behavior described above, seeding by id is a great way to use this library to implement a deterministic mock API with pseudo-random data.

### Advanced Usage

Blueprints for schemas can be nested any-level deep, have derived properties that are deterministic, and using the `withProbability` helper, can return either a value or null, also deterministically.

The following code snippet displays how to combine these advanced techniques:

```
const faker = require('faker')
const { 
  Schema, 
  withProbability 
} = require('faker-schema')

const personSchema = new Schema(() => ({
  firstName: faker.name.firstName(),
  lastName: withProbability(
    faker.name.lastName(), 0.5
  ),
  fullName: ({ firstName, lastName }) =>
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName || lastName,
  address: {
    streetAddress: withProbabilit(
      faker.address.streetAddress(), 0.5
    ),
    city: faker.address.city(),
    state: faker.address.state(),
    country: withProbability(
      faker.address.country(), 0.5
    ),
    postalCode: withProbability(
      faker.address.zipCode(), 0.25
    ),
  },
  fullAddress: ({ address }) =>
    Object
      .values(address)
      .filter(v => v !== null)
      .join(', ')
      .trim()
}))

const seed = 123
const person = personSchema.makeOne(seed)
const people = personSchema.make(5, seed)
```

Example output from `console.log(person)`:

```
{
  "firstName": "Nannie",
  "lastName": null,
  "fullName": "Nannie",
  "address": {
    "streetAddress": "82890 Andreane Pass",
    "city": "Pabloshire",
    "state": "Massachusetts",
    "country": "Qatar",
    "postalCode": null 
  },
  "fullAddress": "82890 Andreane Pass, Pabloshire, Massachusetts, Qatar"
}
```

### More Information

As you may have noticed, much of the heavy-lifting here comes from Faker. Consult the [Faker README](https://github.com/marak/Faker.js/) for more information.

### License

Copyright (c) 2019 Nickolas Kenyeres 
nickolas@knicklabs.com

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
