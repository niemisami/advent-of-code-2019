const { execute } = require('../supercomputer/v2')

const fs = require('fs')
const inputFile = 'diagnostics.txt'

const instructionList = fs.readFileSync(`${__dirname}/${inputFile}`, 'utf-8')
  .split(/\r?\n/).map(line => line.split(',').map(Number))

// Part 2 test inputs
const input1 = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99]
// Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
const input2 = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]
// Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
const input3 = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]
// Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
const input4 = [3, 3, 1108, -1, 8, 3, 4, 3, 99]
// Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
const input5 = [3, 3, 1107, -1, 8, 3, 4, 3, 99]
// Output 0 if the input is zero or 1 if input non-zero
const input6 = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9] // using position mode
const input7 = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1] // using immediate mode

const instructions = instructionList[0]
execute(instructions)
  .then(output => {
    console.log(output)
  })