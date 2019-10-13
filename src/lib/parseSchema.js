export const parseSchema = (currSch, rootSch) => {
  const sch = rootSch || currSch
  return Object.keys(currSch).reduce((execSch, key) => {
    const val = currSch[key]
    switch (typeof val) {
      case 'object':
        return {
          ...execSch,
          [key]: parseSchema(val, sch),
        }
      case 'function':
        return {
          ...execSch,
          [key]: val(sch),
        }
      default:
        return {
          ...execSch,
          [key]: val,
        }
    }
  }, {})
}

export default parseSchema
