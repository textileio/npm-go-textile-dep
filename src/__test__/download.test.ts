import { promises as fs } from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import goenv from 'go-platform'
import download from '../index'
jest.setTimeout(10000)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

const version = process.env.TARGET_VERSION || 'v' + pkg.version.replace(/-[0-9]+/, '')

describe('go-textile downloads)', () => {
  it('Ensure textile gets downloaded (current version and platform', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    const res = await download()
    expect(res.fileName).toMatch(`textile_${version}_${goenv.GOOS}-${goenv.GOARCH}`)
    expect(res.installPath).toEqual(path.resolve(__dirname, '..', '..', 'binary') + path.sep)
    expect(fs.stat(dir)).resolves.not.toThrow('error')
  })

  it('Ensure Windows version gets downloaded', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    const res = await download(version, 'windows')
    expect(res.fileName).toMatch(`textile_${version}_windows-${goenv.GOARCH}`)
    expect(res.installPath).toEqual(path.resolve(__dirname, '..', '..', 'binary') + path.sep)
    expect(fs.stat(dir)).resolves.not.toThrow('error')
    expect(fs.stat(path.join(dir, 'textile.exe'))).resolves.not.toThrow('error')
  })

  it('Ensure Linux version gets downloaded', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    const res = await download(version, 'linux')
    expect(res.fileName).toMatch(`textile_${version}_linux-${goenv.GOARCH}`)
    expect(res.installPath).toEqual(path.resolve(__dirname, '..', '..', 'binary') + path.sep)
    expect(fs.stat(dir)).resolves.not.toThrow('error')
    expect(fs.stat(path.join(dir, 'textile'))).resolves.not.toThrow('error')
  })

  it('Ensure MacOS version gets downloaded', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    const res = await download(version, 'darwin')
    expect(res.fileName).toMatch(`textile_${version}_darwin-${goenv.GOARCH}`)
    expect(res.installPath).toEqual(path.resolve(__dirname, '..', '..', 'binary') + path.sep)
    expect(fs.stat(dir)).resolves.not.toThrow('error')
    expect(fs.stat(path.join(dir, 'textile'))).resolves.not.toThrow('error')
  })

  it('Ensure TARGET_OS, TARGET_VERSION and TARGET_ARCH version gets downloaded', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    process.env.TARGET_OS = 'windows'
    process.env.TARGET_VERSION = version
    process.env.TARGET_ARCH = 'amd64'

    const res = await download()
    expect(res.fileName).toMatch(
      `textile_${process.env.TARGET_VERSION}_${process.env.TARGET_OS}-${process.env.TARGET_ARCH}`,
    )
    expect(res.installPath).toEqual(path.resolve(__dirname, '..', '..', 'binary') + path.sep)
    expect(fs.stat(dir)).resolves.not.toThrow('error')
    expect(fs.stat(path.join(dir, 'textile.exe'))).resolves.not.toThrow('error')
    // Cleanup
    delete process.env.TARGET_OS
    delete process.env.TARGET_VERSION
    delete process.env.TARGET_ARCH
  })

  it('Returns an error when version unsupported', async () => {
    const dir = path.resolve(__dirname, '..', '..', 'binary')
    rimraf.sync(dir)
    const expected = 'Unable to access requested release: HttpError: Not Found'
    expect(download('bogusversion', 'linax')).rejects.toThrow(expected)
  })
})
