const fs = require('fs');
//将传入的路径异步拷贝到光标所在目录，保留最后一级文件夹及文件名
module.exports = function copy(source, callback) {
    //异步读取
    let target = source.split('/')[source.split('/').length - 2] +'/'+ source.split('/')[source.split('/').length - 1];
    console.log(target);
    fs.readFile(source, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        } else {
            let directory = target.split('/')[0];
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
                fs.createWriteStream(target);
            } else {
                fs.createWriteStream(target);
            }
            setTimeout(() => {
                fs.stat(target, function (err, stat) {
                    console.log("The file has been generated:  " + target);
                    if (stat.isFile()) {
                        //异步写入
                        fs.writeFile(target, data, callback);
                    }
                })
            }, 0);

        }
    });
};
