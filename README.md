# is-inside-git

[![npm](https://img.shields.io/npm/v/is-inside-git.svg?label=npm%20version)](https://www.npmjs.com/package/is-inside-git)
[![Linux Build Status](https://img.shields.io/circleci/project/github/chrisblossom/is-inside-git/master.svg?label=linux%20build)](https://circleci.com/gh/chrisblossom/is-inside-git/tree/master)
[![Windows Build Status](https://img.shields.io/appveyor/ci/chrisblossom/is-inside-git/master.svg?label=windows%20build)](https://ci.appveyor.com/project/chrisblossom/is-inside-git/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/chrisblossom/is-inside-git/master.svg)](https://codecov.io/gh/chrisblossom/is-inside-git/branch/master)

## About

Check if a file or directory is inside a git repository.

## Installation

`npm install --save is-inside-git`

## Usage

```ts
const { isInsideGit, isInsideGitSync } = require('is-inside-git');

// defaults to process.cwd();
const dirPathname = 'nested';
const filePathname = 'file.js';

// async
const dirInsideGit: boolean = await isInsideGit(dirPathname);
const fileInsideGit: boolean = await isInsideGit(filePathname);

// sync
const dirInsideGit: boolean = isInsideGitSync(dirPathname);
const fileInsideGit: boolean = isInsideGitSync(filePathname);
```
