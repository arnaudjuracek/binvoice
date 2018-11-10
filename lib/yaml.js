const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const isYaml = require('@utils/file-is-yaml')
const parentDirectory = require('@utils/file-parent-directory')

const load = filename => {
  const directory = parentDirectory(filename)

  // SEE: https://github.com/nodeca/js-yaml/blob/master/examples/custom_types.js
  const schema = yaml.Schema.create([
    new yaml.Type('!ref', {
      kind: 'scalar',
      construct: refname => {
        const refFilename = path.join(directory, refname)

        if (!fs.existsSync(refFilename)) {
          throw new Error(`${refFilename}: file not found.`)
        }

        return isYaml(refFilename)
          ? load(refFilename)
          : path.resolve(refFilename)
      }
    })
  ])

  const fileContent = fs.readFileSync(filename)
  return yaml.load(fileContent, { schema })
}

module.exports = load
