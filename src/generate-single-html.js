const fs = require('fs-extra');
const chalk = require('chalk');
const marked = require("marked");
const path = require("path");
const HtmlEditor = require('./parse.js');
const SingleFileBuilder = require('./single-file-builder.js');

function copy(source, target, callback) {
    callback = callback || function () { };

    fs.readFile(source, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        } else {
            fs.createWriteStream(target);
            setTimeout(() => {
                fs.stat(target, function (err, stat) {
                    console.log("The file has been generated:  " + target);
                    if (stat.isFile()) {
                        //异步写入
                        fs.writeFile(target, data, callback);
                    }
                });
            }, 0);
        }
    });
}

exports.run = function (name) {
    const pageFile = name;
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
                        let htmlName = name.replace('.md', '.html');
                        fs.writeFile(path.join('.', htmlName), HtmlEditor.getSingleFileMenu(html), function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(htmlName + ' template create success！');
                                SingleFileBuilder(htmlName, ()=> {
                                    fs.moveSync(path.join(__dirname, '../tmp/index.html'), path.join(process.cwd(), htmlName), { overwrite: true });
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

function makeH(html) {
    var reg = new RegExp(/\<h.*\>(.*)\<\/h(.*)>/, "g");
    return html.replace(reg, `<h$2 id="$1">$1</h$2>`);
}
