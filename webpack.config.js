const path = require('path');

module.exports = {
    entry: {
        bundle: './app/pageg.tsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true      
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test:/\.(ts|tsx)$/,
            }
        ]
    }
}