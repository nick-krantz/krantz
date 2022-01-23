/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const readline = require('readline')

/**
 * Sort TODO List in README.md
 *
 * Note: it will sort any line that is checkbox list in the README
 */
async function sortTODOList() {
  const lines = []

  const fileStream = fs.createReadStream('./README.md')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    lines.push(line)
  }

  lines.sort((a, b) => {
    if (isTODOListLine(a) && isTODOListLine(b)) {
      return isUnfinishedTODO(a) ? -1 : 1
    }
    return 0
  })

  const newREADME = lines.reduce((file, line) => {
    return (file += line + '\n')
  }, '')

  await fs.writeFileSync('./test.md', newREADME)
}

function isTODOListLine(line) {
  return isUnfinishedTODO(line) || isCompletedTODO(line)
}

function isUnfinishedTODO(line) {
  return line.startsWith('- [ ]')
}

function isCompletedTODO(line) {
  return line.startsWith('- [x]')
}

sortTODOList()
