const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const MergePlugin = require("merge-webpack-plugin")
const { readFileSync, fstatSync, statSync } = require('fs')
const { sync } = require('glob')

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
            '~': resolve(__dirname, 'src/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: resolve(__dirname, 'dist'),
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
                    from: resolve(__dirname, 'src', 'static'),
                    to: resolve(__dirname, 'dist', 'frontend')
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
        new Dotenv()
    ]
})

const baseServicesConfig = Object.assign({}, config, {
    target: 'async-node',
    plugins: [
        new Dotenv()
    ]
})

const servicesDir = resolve(__dirname, 'src/services')
const services = sync(resolve(servicesDir, '*'))

const servicesConfig = services.map(path => {
    const service = path.substr(servicesDir.length).match(/[^\/]+/)[0]

    let hasConfig = false
    try {
        let stats = statSync(`${path}/webpack.config.js`)

        if (stats.isFile()) {
            hasConfig = true
        }
    } finally {
        let extraConfig = {}

        if (hasConfig) {
            extraConfig = require(`${path}/webpack.config.js`)
        }

        return Object.assign({}, baseServicesConfig, {
            entry: {
                [service]: `${path}/index.ts`,
            },
            ...extraConfig
        })
    }
})

console.log(servicesConfig)

module.exports = [
    frontendConfig,
    backendConfig,
    ...servicesConfig
]