const walk = require('./modules/Walker.js');

// Start of procedure
console.time("main");
console.time("walk");
walk.Walk("blog", false);