const compute = require('@lib/compute')
const configuration = require('@configuration')
const createTemplate = require('@lib/template')
const path = require('path')
const PDF = require('html-pdf')
const promisify = require('@utils/promisify')
const util = require('util')
const yaml = require('@lib/yaml')

module.exports = async filename => {
  const extension = path.extname(filename)
  const data = await yaml(filename)
  const computed = compute(data)

  if (configuration.debug) {
    console.log(util.inspect(computed, { colors: true, depth: null }))
  }

  if (!data.template) throw new Error('No template found')

  const template = await createTemplate(data.template)
  const html = template(computed)

  const pdf = PDF.create(html, configuration.pdf)
  const outputFilename = filename.replace(extension, '.pdf')
  const output = configuration.output
    ? path.resolve(path.join(configuration.output, outputFilename))
    : outputFilename
  return promisify(pdf.toFile.bind(pdf))(output)
}
