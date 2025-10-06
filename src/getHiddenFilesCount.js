import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

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

const getHiddenFilesCount = (node) => {
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return name.startsWith('.') ? 1 : 0
  }

  const children = fsTrees.getChildren(node)
  const hiddenFilesCounts = children.map(getHiddenFilesCount)
  return _.sum(hiddenFilesCounts)
}

export default getHiddenFilesCount

getHiddenFilesCount(tree) // 3
