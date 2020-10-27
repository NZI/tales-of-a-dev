const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    devtool: 'inline-source-map',
    mode: 'development',
    externals: {
        sqlite3: 'commonjs sqlite3',
        typeorm: 'commonjs typeorm'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src/'),
        },
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/bundle.js'
    }
}

const frontendConfig = Object.assign({}, config, {
    target: 'es5',
    entry: {
        frontend: './src/frontend/index.ts',
    }
})

const backendConfig = Object.assign({}, config, {
    target: 'node',
    entry: {
        backend: './src/backend/index.ts',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'static'),
                    to: path.resolve(__dirname, 'dist', 'static')
                },
            ],
        }),
    ]
})

module.exports = [frontendConfig, backendConfig]