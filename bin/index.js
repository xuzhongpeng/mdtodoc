#!/usr/bin/env node
process.title = 'mdtodoc';
const program = require('commander')
program
.version(require('../package').version)
.usage('<command> [options]')
.command('generate', 'generate file from a template (short-cut alias: "g")')
.parse(process.argv)


require('./generate');   //引入