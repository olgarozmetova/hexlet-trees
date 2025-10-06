import _ from 'lodash'

const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
}

const changeClass = (tree, classNameFrom, classNameTo) => {
  const innerFunc = (node) => {
    const updatedNode = { ...node }

    if (_.has(node, 'className')) {
      const newClassName
        = classNameFrom === node.className ? classNameTo : node.className
      updatedNode.className = newClassName
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(innerFunc)
      updatedNode.children = newChildren
    }

    return updatedNode
  }

  return innerFunc(tree)
}

export default changeClass

changeClass(tree, 'old-class', 'new-class')
// Результат:
// {
//   name: 'div',
//   type: 'tag-internal',
//   className: 'hexlet-community',
//   children: [
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//   ],
// }
