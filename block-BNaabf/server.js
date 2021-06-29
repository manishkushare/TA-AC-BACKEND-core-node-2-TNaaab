const path = require('path');

console.log(path.join(__dirname , "client/index.js"));
console.log(path.relative("server.js","client/index.js"));
