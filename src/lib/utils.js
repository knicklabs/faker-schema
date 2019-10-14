export const postProcessSchema = (leafSchema = {}, rootSchema = leafSchema) =>
  Object.keys(leafSchema).reduce((schema, key) => {
    const value = leafSchema[key]
    switch (typeof value) {
      case 'object':
        if (value === null || Array.isArray(value)) {
          return {
            ...schema,
            [key]: value,
          }
        } else {
          return {
            ...schema,
            [key]: postProcessSchema(value, rootSchema)
          }
        }
      case 'function':
        return {
          ...schema,
          [key]: value(rootSchema),
        }
      default:
        return {
          ...schema,
          [key]: value,
        }
    }
  }, {})
