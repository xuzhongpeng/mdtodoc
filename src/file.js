const fs = require('fs')
//异步拷贝
module.exports = function copy(sourse, callback) {
    //异步读取
    let target = sourse.split('/')[sourse.split('/').length - 2] +'/'+ sourse.split('/')[sourse.split('/').length - 1]
    console.log(target)
    fs.readFile(sourse, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        } else {
            let directory = target.split('/')[0];
            let filename = target.split('/')[1];
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
                fs.createWriteStream(target)
            } else {
                fs.createWriteStream(target)
            }
            setTimeout(() => {
                fs.stat(target, function (err, stat) {
                    console.log("The file has been generated:  " + target)
                    if (stat.isFile()) {
                        //异步写入
                        fs.writeFile(target, data, callback)
                    }
                })
            }, 0);

        }
    });
};