const chalk = require('chalk')

module.exports = 
{
    banner:function()
    {
       console.log(chalk.hex('#ffffff')(" "))
       console.log(chalk.hex('#ffffff')(" ______         _______ _______ _______"))
       console.log(chalk.hex('#ffffff')(" |_____] |      |_____| |______    |   "))
       console.log(chalk.hex('#ffffff')(" |_____] |_____ |     | ______|    |   "))
       console.log(chalk.hex('#ffffff')("                                a strongest http flood."))
       console.log(chalk.hex('#ffffff')(" "))
    },
    info: function (message) 
    {
        console.log(` ${chalk.hex('#ffffff')("[ ")} ${chalk.hex('#0084ff')("INFO")} ${chalk.hex('#ffffff')(` ] - ${message}`)}`)
    },
    success: function (message) 
    {
        console.log(` ${chalk.hex('#ffffff')("[ ")} ${chalk.hex('#00cf15')("SUCCESS")} ${chalk.hex('#ffffff')(` ] - ${message}`)}`)
    },
    error: function (message) 
    {
        console.log(` ${chalk.hex('#ffffff')("[ ")} ${chalk.hex('#cf0000')("ERROR")} ${chalk.hex('#ffffff')(` ] - ${message}`)}`)
    },
    warn: function (message) 
    {
        console.log(` ${chalk.hex('#ffffff')("[ ")} ${chalk.hex('#fff700')("WARNING")} ${chalk.hex('#ffffff')(` ] - ${message}`)}`)
    }
};