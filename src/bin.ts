#!/usr/bin/env node

import download, { Result } from './'

const error = (err: Error) => {
  process.stdout.write(`${err}\n`)
  process.stdout.write(`Download failed!\n\n`)
  process.exit(1)
}

const success = (output: Result) => {
  process.stdout.write(`Downloaded ${output.fileName}\n`)
  process.stdout.write(
    `Installed ${output.fileName
      .replace('.tar.gz', '')
      .replace('.zip', '')
      .replace(/_/g, ' ')} to ${output.installPath}\n`,
  )
  process.exit(0)
}

download(...process.argv.slice(2))
  .then(success)
  .catch(error)
