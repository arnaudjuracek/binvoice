const format = require('format-number')
const fs = require('fs')
const Handlebars = require('handlebars')
const int = require('@utils/number-is-int')

const CACHED_TEMPLATES = {}

Handlebars.registerHelper('number', value => format({
  integerSeparator: '&nbsp;',
  decimal: ',',
  padRight: int(value) ? 0 : 2
})(value))

module.exports = async filename => {
  if (!fs.existsSync(filename)) return

  if (CACHED_TEMPLATES.hasOwnProperty(filename)) {
    return CACHED_TEMPLATES[filename]
  }

  const template = fs.readFileSync(filename, 'utf8')
  CACHED_TEMPLATES[filename] = Handlebars.compile(template)
  return CACHED_TEMPLATES[filename]
}
