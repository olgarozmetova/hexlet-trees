import generate from '../src/generator.js'
import { expect, test } from '@jest/globals'

test('generate', () => {
  const expectation = {
    name: 'nodejs-package',
    type: 'directory',
    meta: { hidden: true },
    children: [
      { name: 'Makefile', type: 'file', meta: {} },
      { name: 'README.md', type: 'file', meta: {} },
      { name: 'dist', type: 'directory', meta: {} },
      {
        name: '__tests__',
        type: 'directory',
        children: [
          {
            name: 'half.test.js',
            type: 'file',
            meta: { type: 'text/javascript' },
          },
        ],
      },
      {
        name: 'babel.config.js',
        type: 'file',
        meta: { type: 'text/javascript' },
      },
      {
        name: 'node_modules',
        type: 'directory',
        meta: { owner: 'root', hidden: false },
        children: [
          {
            name: '@babel',
            type: 'directory',
            children: [
              {
                name: 'cli',
                type: 'directory',
                children: [
                  {
                    name: 'LICENSE',
                    type: 'file',
                    meta: {},
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
  const tree = generate()

  expect(tree).toMatchObject(expectation)
})
