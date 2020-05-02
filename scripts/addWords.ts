#!/usr/bin/env npx ts-node-script

// console.log(a.split("\n").filter(w => w !== '').map(w => `\"${w}\"`).join(",\n"))
import { exec } from "child_process";

exec("ls1 -la", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        process.exit(error.code);
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        process.exit(2);
    }
    console.log(`stdout: ${stdout}`);
});