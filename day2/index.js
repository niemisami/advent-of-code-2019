const inputData = require('./input')

// test inputs
const t1 = [1, 0, 0, 0, 99] // becomes 2,0,0,0,99 (1 + 1 = 2).
const t2 = [2, 3, 0, 3, 99] //becomes 2,3,0,6,99 (3 * 2 = 6).
const t3 = [2, 4, 4, 5, 99, 0] //becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
const t4 = [1, 1, 1, 4, 99, 5, 6, 0, 99] //becomes 30,1,1,4,2,5,6,0,99.

const updateMemory = (memory, address, value) => {
  memory[address] = value
}
const opcodes = {
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
}
const operations = {
  [opcodes.ADD]: {
    instruction: (memory, [noun, verb]) => memory[noun] + memory[verb],
    getAddress: parameters => parameters[2],
    params: 3
  },
  [opcodes.MULTIPLY]: {
    instruction: (memory, [noun, verb]) => memory[noun] * memory[verb],
    getAddress: parameters => parameters[2],
    params: 3
  },
  [opcodes.HALT]: {
    instruction: () => null,
    params: 0,
    halt: true
  }
}
const getParameters = (memory, address, instruction) => {
  return [...Array(instruction.params)].map((_, index) =>
    memory[address + index + 1]
  )
}

const input = inputData
const memory = [inputData[0], 62, 55, ...input.slice(3)]

let address = 0
let opcode = memory[address]
let operation = operations[opcode]
while (!operation.halt) {
  const parameters = getParameters(memory, address, operation)
  const value = operation.instruction(memory, parameters)
  const resultAddress = operation.getAddress(parameters)

  updateMemory(memory, resultAddress, value)

  address += operation.params + 1
  opcode = memory[address]
  operation = operations[opcode]
}

const output = memory[0]
const noun = memory[1]
const verb = memory[2]
const aocDay2Answer = 100 * noun + verb
// console.log(output, noun, verb)
console.log('Answer:', aocDay2Answer)