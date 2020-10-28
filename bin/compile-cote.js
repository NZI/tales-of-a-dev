const { resolve } = require('path')
const { readFile, writeFile} = require('fs')
const { promisify } = require('util')
const glob = require('glob')
const watch = require('glob-watcher')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

const cwd = resolve(__dirname, '..')
const servicesDir = 'src/services'
const outFile = 'dist/backend/services.json'

watch(resolve(`${cwd}/${servicesDir}/*/express.json`), done => {
    glob(resolve(`${servicesDir}/*/express.json`), { cwd }, async (err, matches) => {
        console.log(err)
        const entries = {}
        
        for (let match of matches) {
            const key = match.substr(`${cwd}/${servicesDir}/`.length).match(/[^\/]+/)[0]
            entries[key] = JSON.parse(await readFileAsync(match, {encoding: 'utf-8'}))
        }

        console.log(entries)
    
        await writeFileAsync(resolve(cwd, outFile), JSON.stringify(entries))
        done()
    })
})