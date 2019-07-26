# Textile binary distribution for Node _(npm-go-textile-dep)_

[![Made by Textile](https://img.shields.io/badge/made%20by-Textile-informational.svg?style=popout-square)](https://textile.io)
[![Chat on Slack](https://img.shields.io/badge/slack-slack.textile.io-informational.svg?style=popout-square)](https://slack.textile.io)
[![Keywords](https://img.shields.io/github/package-json/keywords/textileio/npm-go-textile-dep.svg?style=popout-square)](./package.json)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/textileio/npm-go-textile-dep.svg?style=popout-square)](./package.json)
[![npm (scoped)](https://img.shields.io/npm/v/@textile/go-textile-dep.svg?style=popout-square)](https://www.npmjs.com/package/@textile/go-textile-dep)
[![node (scoped)](https://img.shields.io/node/v/@textile/go-textile-dep.svg?style=popout-square)](https://www.npmjs.com/package/@textile/go-textile-dep)
[![GitHub license](https://img.shields.io/github/license/textileio/npm-go-textile-dep.svg?style=popout-square)](./LICENSE)
[![David](https://img.shields.io/david/dev/textileio/npm-go-textile-dep.svg)](https://david-dm.org/textileio/npm-go-textile-dep)
[![CircleCI branch](https://img.shields.io/circleci/project/github/textileio/npm-go-textile-dep/master.svg?style=popout-square)](https://circleci.com/gh/textileio/npm-go-textile-dep)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=popout-square)](https://github.com/RichardLitt/standard-readme)
[![docs](https://img.shields.io/badge/docs-master-success.svg?style=popout-square)](https://textileio.github.io/npm-go-textile-dep/)

> Official Textile binary distribution for Node projects

Join us on our [public Slack channel](https://slack.textile.io/) for news, discussions, and status updates.

## Table of Contents

- [Background](#background)
- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Maintainer](#maintainer)
- [Contributing](#contributing)
- [License](#license)
- [About](#about)

## Background

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

## Usage

This module downloads `go-textile` binaries from https://github.com/textileio/go-textile/releases into your project.

By default it will download the go-textile version that matches the npm version of this module. So depending on `@textile/npm-go-textile-dep@0.6.3` will install `go-textile v0.6.3` for your current system architecture, in to your project at `node_modules/@textile/go-textile-dep/binary/textile{.exe}`.

For a more 'standard' approach to installing `go-textile` in JS projects, see [`@textile/go-textile`](https://github.com/textileio/npm-go-textile).

### Overriding the go-textile version

You can override the version of `go-textile` that gets downloaded by adding by adding a `go-textile.version` field to your `package.json`

```json
"go-textile": {
  "version": "v0.6.3"
},
```

### Arguments

When used via `node dist/bin.js`, you can specify the target platform, version and architecture via environment variables: `TARGET_OS`, `TARGET_VERSION` and `TARGET_ARCH`.

We fetch the versions dynamically from [GitHub](https://github.com/textileio/go-textile/releases) where the OSes and architectures are listed as Assets. You can also fetch specific versions via command line arguments in the order of:

```
node dist/bin.js <version> <platform> <architecture> <install directory>
```
For example:
```
node dist/bin.js v0.6.3 linux amd64 ./go-textile
```

## Development

**Note**: The binary gets put in the `binary` folder inside the module folder, so don't commit this!

```sh
# Run all the unit tests
npm run test

# Lint everything
# NOTE: Linting uses `prettier` to auto-fix styling issues when possible
npm run lint
```

You can also compile the Typescript yourself with:

```sh
npm run build
```

If you want to push out a _new_ release, simply run `npm version {path|minor|major}` to run the CI-based release process, `npm` will automatically bump the version, and the CI will fetch the relevant `go-textile` version for testing etc.

## Maintainer

[Carson Farmer](https://github.com/carsonfarmer)

## Contributing

This library is a work in progress. As such, there's a few things you can do right now to help out:

  * Ask questions! We'll try to help. Be sure to drop a note (on the above issue) if there is anything you'd like to work on and we'll update the issue to let others know. Also [get in touch](https://slack.textile.io) on Slack.
  * Log bugs, [file issues](https://github.com/textileio/npm-go-textile-dep/issues), submit pull requests!
  * **Perform code reviews**. More eyes will help a) speed the project along b) ensure quality and c) reduce possible future bugs.
  * Take a look at [go-textile](https://github.com/textileio/go-textile) (which is where the binary is built). Contributions here that would be most helpful are **top-level comments** about how it should look based on our understanding. Again, the more eyes the better.
  * **Add tests**. There can never be enough tests.
  * **Contribute to the [Textile docs](https://github.com/textileio/docs)** with any additions or questions you have about Textile and its various implementations. A good example would be asking, "What is an Textile daemon". If you don't know a term, odds are someone else doesn't either. Eventually, we should have a good understanding of where we need to improve communications and teaching together to make Textile even better.

 Before you get started, be sure to read our [contributors guide](./CONTRIBUTING.md) and our [contributor covenant code of conduct](./CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE)

## About

This package was heavily inspired (it started as a direct fork) by the [`npm-go-ipfs-dep`](https://github.com/ipfs/npm-go-ipfs-dep) library. Big thanks to all the contributors to that original package! See `package.json`, `LICENSE`, and `CHANGELOG.md` in that project for details and contributions.
