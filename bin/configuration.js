const fs = require('fs')
const path = require('path')
const pckg = require('package')(module)
const appname = pckg.name

process.title = appname

const defaultConfigPath = path.join(__dirname, '..', '.apprc')
const defaultConfig = JSON.parse(fs.readFileSync(defaultConfigPath))

const configuration = require('rc')(appname, defaultConfig)
configuration.appname = appname
configuration.package = pckg
configuration.help = configuration.help || configuration.h
configuration.version = configuration.version || configuration.v
configuration.output = configuration.output || configuration.o

module.exports = configuration
