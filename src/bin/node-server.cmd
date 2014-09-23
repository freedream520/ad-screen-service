@echo on
cd ../server
call npm.cmd install
node ./bin/create-package.js
call npm.cmd update
cd ../bin
node ../server/bin/run-server.js -m dev -c ../config