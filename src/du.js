import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf', { size: 800 })]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

const calculateFilesSize = (tree) => {
  if (fsTrees.isFile(tree)) {
    const meta = fsTrees.getMeta(tree)
    return meta.size
  }

  const children = fsTrees.getChildren(tree)
  const sizes = children.map(calculateFilesSize)
  return _.sum(sizes)
}

const du = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children.map(child => [
    fsTrees.getName(child),
    calculateFilesSize(child),
  ])
  // Destructuring
  result.sort(([, size1], [, size2]) => size2 - size1)
  return result
}

export default du

du(tree)
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]
