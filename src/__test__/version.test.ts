import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import execa from 'execa'

/*
  Test that go-textile is downloaded during npm install.
  - package up the current source code with `npm pack`
  - install the tarball into the example project
  - ensure that the "go-textile.version" prop in the package.json is used
*/

const testVersion = require('./__fixture__/example/package.json')['go-textile'].version
let tarballName: string

function packTarball() {
  const parentDir = path.join(__dirname, '..', '..')
  const res = execa.sync('npm', ['pack', parentDir], {
    cwd: __dirname,
  })
  tarballName = res.stdout.split('\n').slice(-1)[0]
  return tarballName
}

describe.skip('go-textile package.json version', () => {
  afterAll(() => {
    fs.unlinkSync(path.join(__dirname, tarballName))
    rimraf.sync(path.join(__dirname, '__fixture__', 'example', 'node_modules'))
  })
  it('should use the go-textile.version defined in parent package.json', () => {
    const tarballName = packTarball()
    // from `example`, install the module
    const res = execa.sync('npm', ['install', '--no-save', path.join('..', '..', tarballName)], {
      cwd: path.join(__dirname, '__fixture__', 'example'),
    })
    const msg = `Downloading https://github.com/textileio/go-textile/releases/download/${testVersion}`
    expect(res.stdout).toMatch(msg)
  })
})
