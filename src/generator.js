import * as fsTrees from '@hexlet/immutable-fs-trees'

export default () => {
  const tree = fsTrees.mkdir(
    'nodejs-package',
    [
      fsTrees.mkfile('Makefile'),
      fsTrees.mkfile('README.md'),
      fsTrees.mkdir('dist'),
      fsTrees.mkdir('__tests__', [
        fsTrees.mkfile('half.test.js', { type: 'text/javascript' }),
      ]),
      fsTrees.mkfile('babel.config.js', { type: 'text/javascript' }),
      fsTrees.mkdir(
        'node_modules',
        [
          fsTrees.mkdir('@babel', [
            fsTrees.mkdir('cli', [fsTrees.mkfile('LICENSE')]),
          ]),
        ],
        { owner: 'root', hidden: false },
      ),
    ],
    { hidden: true },
  )
  return tree
}
