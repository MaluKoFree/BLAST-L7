const fs = require('fs')

const log = require('./modules/logger')
const thread = require('./modules/threads')

var temp = `${__dirname}\\temp.json`

log.banner()

// if (fs.existsSync(temp))
//     fs.unlinkSync(temp)

// fs.writeFile(temp, `{ "host": "", "time": "10" }`, function(err)
// {
    // if(err)
    //     return log.error('error on create temp.json.')

    for (var i = 0; i < 15; i++) 
        thread.CreateThread(`${__dirname}\\modules\\attack.js`)
// })

log.success("Attack started!")