const fs = require("fs");
const path = "blog/_posts/";
const exec = require("child_process").exec;
let filename = process.argv[2];
filename = filename.indexOf(".md") > 0 ? filename : filename + ".md";
filename = path + filename;

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const dateString = year + "-" + month + "-" + day;
const initContent = `---
title:
date: ${dateString}
tags: 
  - Vue
---`;
fs.writeFile(filename, initContent, (error) => {
  if (error) {
    console.error(err);
    return;
  }
  const cmdString = `open -a typora ${filename}`;
  exec(cmdString, (error) => {
    if (error) {
      console.error(error);
    }
  });
});
