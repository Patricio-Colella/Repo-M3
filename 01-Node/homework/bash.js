const command=require("./commands")
// Output un prompt
console.log(this.toString())
var done=(comand)=>{
    process.stdout.write(`\n${comand}`)
    process.stdout.write('\n\ncomando:');
}
process.stdout.write('comando: ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var [cmd,...arg]= data.toString().trim().split(" "); // remueve la nueva línea
    process.stdout.write(`You typed: ${data}`);
    command[cmd](done,arg)
});