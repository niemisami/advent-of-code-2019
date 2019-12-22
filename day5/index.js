const { execute } = require('../supercomputer/v2')

const fs = require('fs')
const inputFile = 'diagnostics.txt'

const instructionList = fs.readFileSync(`${__dirname}/${inputFile}`, 'utf-8')
  .split(/\r?\n/).map(line => line.split(',').map(Number))

execute(instructionList[0])
.then(output => {
  console.log(output)
})