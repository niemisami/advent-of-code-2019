const readline = require('readline')

// NOTE: remember to close the c


const requestSystemId = () => {
  const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => {
    readInput.question('Give system ID:', systemId => {
      console.log(`Received: ${systemId}`)
      resolve(systemId)
    })
  })
    .finally(() => {
      readInput.close()
    })
}
const updateMemory = (memory, address, value) => {
  memory[address] = value
}

const opcodes = {
  ADD: 1,
  MULTIPLY: 2,
  WRITE: 3,
  READ: 4,
  HALT: 99
}

const operations = {
  [opcodes.ADD]: {
    instruction: (memory, parameters, paramModes) => {
      const [noun, verb] = getParameterValues(memory, parameters, paramModes)
      return noun + verb
    },
    getAddress: parameters => parameters[2],
    params: 3
  },
  [opcodes.MULTIPLY]: {
    instruction: (memory, parameters, paramModes) => {
      const [noun, verb] = getParameterValues(memory, parameters, paramModes)
      return noun * verb
    },
    getAddress: parameters => parameters[2],
    params: 3
  },
  [opcodes.WRITE]: {
    instruction: (memory, [writeValue]) => writeValue,
    getAddress: parameters => parameters[0],
    params: 1
  },
  [opcodes.READ]: {
    instruction: (memory, [address]) => {
      console.log('READ', memory[address])
      return memory[address]
    },
    getAddress: parameters => parameters[2],
    params: 1
  },
  [opcodes.HALT]: {
    instruction: () => null,
    params: 0,
    halt: true
  }
}

const interprateOperation = instruction => {
  const instructionString = instruction.toString().padStart('5', '0')
  const opcode = Number.parseInt(instructionString.substring(3, 5))
  const operation = operations[opcode]
  const paramModes = [
    Number.parseInt(instructionString.substring(2, 3)),
    Number.parseInt(instructionString.substring(1, 2)),
    Number.parseInt(instructionString.substring(0, 1))
  ]
  return {
    operation,
    paramModes
  }
}

const getParameters = (memory, address, instruction) =>
  [...Array(instruction.params)].map((_, index) =>
    memory[address + index + 1])

// Modes are: 0 position mode, 1 immediate mode
// Position: read value of the position from memory
// Immediate: use the value as it is
//
// Position mode is the default
const getParameterValues = (memory, params, paramModes) =>
  params.map((paramOrPosition, index) => {
    const mode = paramModes[index] || 0
    return mode ? paramOrPosition : memory[paramOrPosition]
  })

const execute = instructions =>
  requestSystemId()
    .then(systemId => {
      let programCounter = 0
      do {
        let instruction = instructions[programCounter]
        let { operation, paramModes } = interprateOperation(instruction)

        if(operation.halt) {
          break;
        }
        const parameters = getParameters(instructions, programCounter, operation)

        const value = operation === operations[opcodes.WRITE]
          ? Number(systemId)
          : operation.instruction(instructions, parameters, paramModes)

        const resultAddress = operation.getAddress(parameters, paramModes)
        // console.log('A', instructions[225], instructions[224], resultAddress)
        updateMemory(instructions, resultAddress, value)

        programCounter += operation.params + 1

      }
      while(true)
      const output = instructions[0]
      const noun = instructions[1]
      const verb = instructions[2]
      return {
        output,
        noun,
        verb
      }
    })

module.exports = {
  execute
}
