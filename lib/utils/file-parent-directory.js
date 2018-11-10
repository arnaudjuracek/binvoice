const path = require('path')

module.exports = filename => path.isAbsolute(filename)
  ? path.dirname(filename)
  : path.dirname(path.join(process.cwd(), filename))
