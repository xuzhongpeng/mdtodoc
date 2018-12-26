#!/usr/bin/env node
const program = require('commander');

process.title = 'mdtodoc';
program
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('generate','quick generate your file from md to html').alias('g')
    .command('gen-single','generate').alias('s')
    .parse(process.argv);


