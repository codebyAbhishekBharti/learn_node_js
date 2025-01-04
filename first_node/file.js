const fs = require("fs");
// Sync...writing to file
// fs.writeFileSync("./test.txt","Hey World");
// Async...writing to file
// fs.writeFile("./test.txt","Hey World", (err) => {}); 

// reading fle sync
// const result = fs.readFileSync("./contacts.txt","utf-8");
// console.log(result)

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", `${Date.now()} Hey abhi\n`);

fs.copyFileSync("./test.txt","./test2.txt");

fs.unlinkSync("./test2.txt")

console.log(fs.statSync("./test.txt"))

const os = require("os");
console.log(os.cpus().length);