import _ from 'lodash'
import * as fsTrees from '@hexlet/immutable-fs-trees'
import downcaseFileNames from '../src/downcaseFileNames.js'
import { describe, expect, test } from '@jest/globals'

describe('should', () => {
  test('be immutable', () => {
    const tree = fsTrees.mkdir('/', [
      fsTrees.mkdir('eTc', [
        fsTrees.mkdir('NgiNx'),
        fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.json')]),
      ]),
      fsTrees.mkfile('hOsts'),
    ])
    const original = _.cloneDeep(tree)

    downcaseFileNames(tree)

    expect(tree).toEqual(original)
  })

  test('downcase file names', () => {
    const tree = fsTrees.mkdir('/', [
      fsTrees.mkdir('eTc', [
        fsTrees.mkdir('NgiNx'),
        fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.JSON')]),
      ]),
      fsTrees.mkfile('hOsts'),
    ])
    const actual = downcaseFileNames(tree)

    const expected = {
      children: [
        {
          children: [
            {
              name: 'NgiNx',
            },
            {
              children: [{ name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      name: '/',
    }

    expect(actual).toMatchObject(expected)
  })

  test('return full copy', () => {
    const tree = fsTrees.mkdir('/', [
      fsTrees.mkdir('eTc', [
        fsTrees.mkdir('NgiNx', [], { size: 4000 }),
        fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.JSON', { uid: 0 })]),
      ]),
      fsTrees.mkfile('hOsts'),
    ])
    const actual = downcaseFileNames(tree)

    const expected = {
      children: [
        {
          children: [
            {
              meta: { size: 4000 },
              name: 'NgiNx',
            },
            {
              children: [{ meta: { uid: 0 }, name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      meta: {},
      name: '/',
    }

    expect(actual).toMatchObject(expected)
  })

  test('meta is immutable', () => {
    const tree = fsTrees.mkdir(
      '/',
      [
        fsTrees.mkdir('eTc', [
          fsTrees.mkdir('NgiNx'),
          fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.json')]),
        ]),
        fsTrees.mkfile('hOsts'),
      ],
      { lala: 'hexlet' },
    )

    const processedTree = downcaseFileNames(tree)
    processedTree.meta.lala = 'gotcha'

    expect(tree.meta).toEqual({ lala: 'hexlet' })
  })
})
