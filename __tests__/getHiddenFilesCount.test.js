import * as fsTrees from '@hexlet/immutable-fs-trees'
import getHiddenFilesCount from '../src/getHiddenFilesCount.js'
import { expect, test } from '@jest/globals'

test('getHiddenFilesCount 1', () => {
  const tree = fsTrees.mkdir('/', [
    fsTrees.mkdir('etc', [
      fsTrees.mkdir('apache'),
      fsTrees.mkdir('nginx', [fsTrees.mkfile('.nginx.conf', { size: 800 })]),
      fsTrees.mkdir('.consul', [
        fsTrees.mkfile('.config.json', { size: 1200 }),
        fsTrees.mkfile('data', { size: 8200 }),
        fsTrees.mkfile('raft', { size: 80 }),
      ]),
    ]),
    fsTrees.mkfile('.hosts', { size: 3500 }),
    fsTrees.mkfile('resolve', { size: 1000 }),
  ])

  expect(getHiddenFilesCount(tree)).toEqual(3)
})

test('getHiddenFilesCount 2', () => {
  const tree = fsTrees.mkdir('/', [
    fsTrees.mkdir('.etc', [
      fsTrees.mkdir('.apache'),
      fsTrees.mkdir('nginx', [fsTrees.mkfile('.nginx.conf', { size: 800 })]),
    ]),
    fsTrees.mkdir('.consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('.raft', { size: 80 }),
    ]),
    fsTrees.mkfile('hosts', { size: 3500 }),
    fsTrees.mkfile('resolve', { size: 1000 }),
  ])

  expect(getHiddenFilesCount(tree)).toEqual(2)
})
