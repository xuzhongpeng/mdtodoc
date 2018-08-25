#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk')
const md = require('../src/generate');




program
.command('generate')
.description('quick generate your file')
.alias('g')
.action(function(type, name){
    md.run(type, name);
});
program.parse(process.argv);