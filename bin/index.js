#!/usr/bin/env node
require('module-alias/register')

const chalk = require('chalk')
const configuration = require('@configuration')
const fs = require('fs')
const path = require('path')
const render = require('@lib/render')
const spinners = require('@bin/spinners')(require('cli-spinners').dots)

const _ = configuration._
const files = _.filter(require('@utils/file-is-yaml'))
const porcelain = configuration.porcelain || !process.stdout.isTTY

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

// Reject when no files
if (!files.length) {
  console.error(chalk.red('✖ error:'), 'No matching file given. Try running binvoice against YAML files.')
  process.exit(1)
}

async function renderAndSpin (file) {
  const spinner = spinners.add(file)
  try {
    const output = await render(file)
    spinner.success(path.relative(process.cwd(), output.filename))
  } catch (error) {
    spinner.error(error.message)
  }
}

Promise.all(files.map(porcelain ? render : renderAndSpin))
  .then(result => {
    spinners.done()
    if (porcelain) console.log(result.map(r => r.filename).join('\n'))
  })
  .catch(error => {
    spinners.done()
    console.error(error)
    process.exit(1)
  })
