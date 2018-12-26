const fs = require('fs-extra');
const chalk = require('chalk');
const path = require("path");
const marked = require("./markdown-convert.js");
const HtmlEditor = require('./parse.js');
const SingleFileBuilder = require('./single-file-builder.js');

const CurrentWorkingDirectory = process.cwd();
// process.chdir(path.join(__dirname, ".."));

exports.run = function (name) {
    const pageFile = path.join(CurrentWorkingDirectory, name);
    fs.pathExists(pageFile, (err, exists) => {
        if (exists) {
            if (pageFile.indexOf('.md') == -1) {
                console.log(chalk.red("Conversion format is not correct."))
            } else {
                fs.readFile(pageFile, (err, file) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var html = HtmlEditor.makeIdForHElement(marked(file.toString()));
                        html = HtmlEditor.addHighlightJsClass(html);
                        let htmlName = name.replace('.md', '.html');
                        fs.writeFile(path.join('.', htmlName), HtmlEditor.getSingleFileMenu(html), function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(htmlName + ' template create success！');
                                SingleFileBuilder(htmlName, ()=> {
                                    fs.moveSync(path.join(__dirname, '../tmp/index.html'), path.join(CurrentWorkingDirectory, htmlName), { overwrite: true });
                                    console.log('convert success!');
                                });
                            }
                        });
                    }
                });
            }
        } else {
            console.log(chalk.red("file is not find"));
        }
    })
};

