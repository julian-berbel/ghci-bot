const Discord = require('discord.js');
const exec = require('child_process');

const client = new Discord.Client();

function ghci(message, expression) {
  eval_expression = /^\s*:/.test(expression) ? expression : `pp $ ${expression}`
  exec.execFile('docker', ['exec', '-i', 'haskell', 'bash', '-c', 'echo $0 | timeout -s 9 5 ghci prettify.hs', eval_expression],
    (error, stdout, stderr) => {
      var rta = stdout.split('\n')[3];
      if (error) {
        message.reply(error.toString());
      } else {
        message.reply(`Expresión evaluada:\n\`\`\`haskell\n*Main> ${expression}\n${stderr.trim() || rta.replace(/\*Main> /, '')}\`\`\``);
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
