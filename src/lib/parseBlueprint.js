export const parseBlueprint = (bp = {}) => {
  const execBp = typeof bp === 'function' ? bp() : bp
  return Object.keys(execBp).reduce((schema, key) => {
    const val = execBp[key]
    switch (typeof val) {
      case 'object':
        return {
          ...schema,
          [key]: parseBlueprint(val),
        }
      default:
        return {
          ...schema,
          [key]: val,
        }
    }
  }, {})
}

export default parseBlueprint
