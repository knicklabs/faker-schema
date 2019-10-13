export const postProcessSchema = (leafSchema = {}, rootSchema = leafSchema) =>
  Object.keys(leafSchema).reduce((schema, key) => {
    const value = leafSchema[key]
    switch (typeof value) {
      case 'object':
        return {
          ...schema,
          [key]: (() => {
            if (value === null || Array.isArray(value)) {
              return value
            }
            return postProcessSchema(value, rootSchema)
          })()
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


export default postProcessSchema
