var tty = require('tty');
var ttys = require('ttys');
//var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
async function ask(question){
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            // TODO：将答案记录在数据库中。
            //console.log(`感谢您的宝贵意见：${answer}`);
          
            //rl.close();

            resolve(answer);
          });
    })
}
void async function (){
    console.log(await ask("your project name?"))
}()