import * as fsTrees from '@hexlet/immutable-fs-trees'
import { compressImages } from '../src/compressImages.js'
import { expect, test } from '@jest/globals'

test('compressImages 1', () => {
  const tree = fsTrees.mkdir(
    'my documents',
    [
      fsTrees.mkdir('documents.jpg'),
      fsTrees.mkfile('avatar.jpg', { size: 100 }),
      fsTrees.mkfile('passport.jpg', { size: 200 }),
      fsTrees.mkfile('family.jpg', { size: 150 }),
      fsTrees.mkfile('addresses', { size: 125 }),
      fsTrees.mkdir('presentations'),
    ],
    { test: 'haha' },
  )

  const newTree = compressImages(tree)

  const expectation = [
    {
      name: 'documents.jpg',
      type: 'directory',
    },
    {
      name: 'avatar.jpg',
      meta: { size: 50 },
      type: 'file',
    },
    {
      name: 'passport.jpg',
      meta: { size: 100 },
      type: 'file',
    },
    {
      name: 'family.jpg',
      meta: { size: 75 },
      type: 'file',
    },
    {
      name: 'addresses',
      meta: { size: 125 },
      type: 'file',
    },
    {
      name: 'presentations',
      type: 'directory',
    },
  ]

  expect(newTree).toMatchObject({
    meta: { test: 'haha' },
    children: expectation,
  })
})

test('compressImages 2', () => {
  const tree = fsTrees.mkdir('my documents', [fsTrees.mkdir('presentations')])

  const newTree = compressImages(tree)

  expect(newTree).toMatchObject({
    meta: {},
    children: [{ name: 'presentations' }],
  })
})

test('compressImages 3 - deepClone', () => {
  const tree = fsTrees.mkdir(
    'my documents',
    [
      fsTrees.mkfile('avatar.jpg', {
        size: 100,
        attributes: { hide: false, readOnly: true },
      }),
      fsTrees.mkdir('presentations'),
    ],
    { owner: 'hexlet' },
  )

  const newTree = compressImages(tree)
  const newFile = fsTrees.getChildren(newTree)[0]
  const newFileMeta = fsTrees.getMeta(newFile)
  newFileMeta.attributes.hide = true
  const oldFile = fsTrees.getChildren(tree)[0]
  const oldFileMeta = fsTrees.getMeta(oldFile)
  expect(oldFileMeta.attributes.hide).toEqual(false)

  const newTreeMeta = fsTrees.getMeta(newTree)
  newTreeMeta.owner = 'user'
  expect(fsTrees.getMeta(tree).owner).toEqual('hexlet')
})
