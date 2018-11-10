const path = require('path')

module.exports = filename => ['.yml', '.yaml'].includes(path.extname(filename))
