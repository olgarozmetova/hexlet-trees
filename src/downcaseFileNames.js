import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('eTc', [
    fsTrees.mkdir('NgiNx'),
    fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.json')]),
  ]),
  fsTrees.mkfile('hOsts'),
])

const downcaseFileNames = (node) => {
  const newMeta = _.cloneDeep(fsTrees.getMeta(node))
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return fsTrees.mkfile(name.toLowerCase(), newMeta)
  }
  const children = fsTrees.getChildren(node)
  const newChildren = children.map(downcaseFileNames)
  return fsTrees.mkdir(name, newChildren, newMeta)
}

export default downcaseFileNames

downcaseFileNames(tree)

// {
//   name: '/',
//   type: 'directory',
//   meta: {},
//   children: [
//     {
//       name: 'eTc',
//       type: 'directory',
//       meta: {},
//       children: [
//         {
//           name: 'NgiNx',
//           type: 'directory',
//           meta: {},
//           children: [],
//         },
//         {
//           name: 'CONSUL',
//           type: 'directory',
//           meta: {},
//           children: [{ name: 'config.json', type: 'file', meta: {} }],
//         },
//       ],
//     },
//     { name: 'hosts', type: 'file', meta: {}, },
//   ],
// }
