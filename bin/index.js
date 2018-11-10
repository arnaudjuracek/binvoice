#!/usr/bin/env node
require('module-alias/register')

const chalk = require('chalk')
const configuration = require('@configuration')
const fs = require('fs')
const path = require('path')
const _ = configuration._

// Show help
if (_.includes('help') || configuration.help) {
  console.log(fs.readFileSync(path.join(__dirname, '..', 'USAGE'), 'utf-8'))
  process.exit(0)
}

// Show version
if (_.includes('version') || configuration.version) {
  console.log(configuration.package.version)
  process.exit(0)
}

const render = require('@lib/render')
const spinners = require('@bin/spinners')(require('cli-spinners').dots)
const files = _.filter(require('@utils/file-is-yaml'))

if (!files.length) {
  console.log(chalk.red('✖ error:'), 'No matching file given. Try running binvoice against YAML files.')
  process.exit(1)
}

Promise.all(files.map(async file => {
  const spinner = spinners.add(file)
  try {
    const output = await render(file)
    spinner.success(path.relative(process.cwd(), output.filename))
  } catch (error) {
    spinner.error(error.message)
  }
}))
  .then(spinners.done)
  .catch(error => {
    spinners.done()
    console.log(error)
    process.exit(1)
  })
