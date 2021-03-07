const Discord = require('discord.js');
const exec = require('child_process');
require('dotenv').config()

const client = new Discord.Client();

function ghci(message, expression) {
  eval_expression = /^\s*:/.test(expression) ? expression : `pp $ ${expression}`
  exec.execFile('docker', ['exec', '-i', 'haskell', 'bash', '-c', 'timeout 5 ghci prettify.hs <<< $0', eval_expression],
    (error, stdout, stderr) => {
      var rta = stdout.split('\n')[3];
      if (error) {
        message.reply(error.toString());
      } else {
        message.reply(`Expresión evaluada:\n\`\`\`haskell\n ${stderr.trim() || rta}\`\`\``);
      }
    });
}

client.on('message', message => {
  if (message.content.startsWith('!ghci ')) {
    var expression = message.content.replace(/^!ghci /, '');
    ghci(message, expression);
  }
});

client.login();
