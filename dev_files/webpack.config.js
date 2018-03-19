var path = require('path');

module.exports = {
    entry: './frontend/index.js',
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
            { 
                test: /\.js[x]?$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['es2015', 'react', 'stage-0'],
                    }
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
        　　  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js']
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
