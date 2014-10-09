#!/bin/sh
cd ../server
npm install
node ./bin/create-package.js
npm update
cd ../bin