const fs = require('fs-extra')
//const nodefs= require('fs')
const chalk = require('chalk')
const marked = require("marked")

const htmlEdit = require('./parse.js')
const copy = require('./file.js')

exports.run = function (type, name) {
    switch (type) {
        case 'change':
            const pageFile = name;
            fs.pathExists(pageFile, (err, exists) => {
                if (exists) {
                    if (pageFile.indexOf('.md') == -1) {
                        console.log("Conversion format is not correct.")
                    } else {
                        fs.readFile(pageFile, (err, file) => {
                            if (err) {
                                console.log(err)
                            } else {
                                var html = makeH(marked(file.toString()));
                                //console.log(html)
                                let htmlName = name.replace('.md', '.html');
                                fs.writeFile('./' + htmlName, htmlEdit.getMultiFilesMenu(html), function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(htmlName + ' create success！')
                                    }
                                })

                                //拷贝css文件
                                let sourse = __dirname.replace('src', 'public/');
                                //console.log(sourse)
                                //return
                                //let target='style/style.css'

                                copy(sourse + 'style/style.css', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                copy(sourse + 'style/Dosis-Medium.ttf', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                copy(sourse + 'style/RobotoMono-Regular.ttf', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                copy(sourse + 'style/SourceSansPro-Regular.ttf', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                copy(sourse + 'style/SourceSansPro-Semibold.ttf', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })

                                copy(sourse + 'js/scroll.js', function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                            }
                        });
                    }
                } else {
                    console.log("file is not find")
                }
            })
            break;
        default:
            console.log(chalk.red(`ERROR: uncaught type , you should input like $ xu g page demo`))
            console.log()
            console.log('  Examples:')
            console.log()
            console.log(chalk.gray('    # create a new page'))
            console.log('    $ xu g page product')
            console.log()
            console.log(chalk.gray('    # create a new component'))
            console.log('    $ xu g component  product')
            console.log()
            console.log(chalk.gray('    # create a new store'))
            console.log('    $ xu g store  product')
            console.log()
            break;
    }
};

function makeH(html) {
    var reg = new RegExp(/\<h.*\>(.*)\<\/h(.*)>/, "g");
    return html.replace(reg, `<h$2 id="$1">$1</h$2>`);
}
