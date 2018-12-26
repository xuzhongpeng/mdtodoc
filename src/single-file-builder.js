const path = require('path');
const webpack = require('webpack');
const webpackConfigMaker = require('./webpack.config.js');


module.exports = function (filename, callback) {
    const config = webpackConfigMaker(path.join(process.cwd(), filename));

    webpack(config, (err, stats) => {
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        callback && callback();
    });
};
