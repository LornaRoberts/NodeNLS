#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const { lstat} = fs.promises;
const chalk= require('chalk');
const targetDir = process.argv[2] || process.cwd();
const path = require('path');

fs.readdir(targetDir, async (err, filenames) => {
//either
//error = error object, something went wrong
//or
//err === null, everything is ok
if (err){
    console.log(err);
}

const startPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
});

const allStats = await Promise.all(startPromises);

for (let stats of allStats){
    const index = allStats.indexOf(stats);

    if (stats.isFile()){
        console.log(filenames[index]);
    }else{
        console.log(chalk.bold(filenames[index]));
    
    }

}

});