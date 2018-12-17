#!/usr/bin/env node
const program = require('commander');
const md = require('../src/generate-single-html');
const chalk = require('chalk');

program
    .on('--help', function() {
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log(chalk.gray('  # change markdown to single html'));
        console.log('  $ mdtodoc s your-file.md');
    })
    .action(function(name){
        if(!name) {
            console.log(chalk.red(`ERROR: you should input like`));
            console.log('  Examples:');
            console.log(chalk.gray('    # change markdown to single html'));
            console.log('    $ mdtodoc s your-file.md');
            return;
        }
        md.run(name);
    });
program.parse(process.argv);
