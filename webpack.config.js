const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const config = {
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
    },
    plugins: [
        new Dotenv(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'static'),
                    to: path.resolve(__dirname, 'dist', 'frontend')
                },
            ],
        }),
    ]
})

const backendConfig = Object.assign({}, config, {
    target: 'async-node',
    entry: {
        backend: './src/backend/index.ts',
    },
    plugins: [
        new Dotenv(),
    ]
})

module.exports = [
    frontendConfig,
    backendConfig
]