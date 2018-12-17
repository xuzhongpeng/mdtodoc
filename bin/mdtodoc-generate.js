#!/usr/bin/env node
const program = require('commander');
const md = require('../src/generate');
const chalk = require('chalk');

program
.on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log(chalk.gray('  # change markdown to html'));
    console.log('  $ mdtodoc g change  your-file.md');
})
.action(function(type, name){
    if(!type || !name) {
        console.log(chalk.red(`ERROR: you should input like`));
        console.log('  Examples:');
        console.log(chalk.gray('    # change markdown to html'));
        console.log('    $ mdtodoc g change  your-file.md');
        return;
    }
    md.run(type, name);
});
program.parse(process.argv);
