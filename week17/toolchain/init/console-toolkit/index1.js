const { stdout } = require("ttys");

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app wont quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i dont want binary, do you?
stdin.setEncoding("utf-8");

/*
// on any data into stdin
stdin.on('data', function(key){
    // ctrl-c (end of text)
    if(key === '\u0003'){
        process.exit();
    }

    // write the key to stdout all normal like

    process.stdout.write(key.charCodeAt(0).toString())
})
*/
function getChar(){
    return new Promise(resolve => {
        stdin.once('data', resolve);
    })
}
function up(n = 1){
    stdout.write("\033[" + n + "A");
}
function down(n = 1){
    stdout.write("\033[" + n + "B");
}
function left(n = 1){
    stdout.write("\033[" + n + "D");
}
function right(n = 1){
    stdout.write("\033[" + n + "C");
}

void async function (){
    stdout.write('你在哪个城市？\n')
    let answer = await select(['北京',"上海","广州"])
    left();
    stdout.write("你在"+ answer + "啊？好巧，我也在"+ answer +"\n");
    process.exit();
}();

async function select(choices){
    let selected = 0;
    for(let i = 0; i < choices.length; i++){
        let choice = choices[i];
        if(i === selected){
            // \x1b[41m 字体颜色
            // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
            stdout.write(`[\x1b[41mx\x1b[0m] ${choice}\n`); 
        }else{
            stdout.write(`[ ] ${choice}\n`);
        }
    }
    up(choices.length)
    right();
    while(true){
        let char = await getChar();
        if(char === '\u0003'){
            process.exit();
        }else if(char === '\u001b[A' && selected > 0){ // 上
            stdout.write(" ")
            left();
            selected--;
            up();
            stdout.write("\x1b[41mx\x1b[0m")
            left();
            //stdout.write("来吧")
        }else if(char === '\u001b[B' && selected < choices.length - 1){ // 下
            stdout.write(" ")
            left();
            selected++;
            down();
            stdout.write("\x1b[41mx\x1b[0m")
            left();
        }else if(char === '\u001b[D'){ // 左

        }else if(char === '\u001b[C'){ // 右

        }else if(char === "\r"){
            down(choices.length - selected)
            return choices[selected];
        }
        //console.dir(char)
        //console.log(char.split('').map(c => c.charCodeAt(0))[2])
    }
}