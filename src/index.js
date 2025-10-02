import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('etc', [
  fsTrees.mkfile('bashrc'),
  fsTrees.mkdir('consul', [fsTrees.mkfile('config.json')]),
])

// Oперации с узлами:
const tree1 = fsTrees.mkdir('/', [fsTrees.mkfile('hexlet.log')], {
  hidden: true,
})
fsTrees.getName(tree1) // '/'
fsTrees.getMeta(tree1).hidden // true

// функции для проверки типа
fsTrees.isDirectory(tree) // true
fsTrees.isFile(tree) // false

const [file] = fsTrees.getChildren(tree1)
fsTrees.getName(file) // 'hexlet.log'

// У файла нет метаданных
fsTrees.getMeta(file).unknown // undefined

// У файлов нет детей
fsTrees.getChildren(file)

// функции для проверки типа
fsTrees.isFile(file) // true
fsTrees.isDirectory(file) // false

// Изменение имени файла:
const file1 = fsTrees.mkfile('one', { size: 35 })
const newMeta = _.cloneDeep(fsTrees.getMeta(file1))
fsTrees.mkfile('new name', newMeta)

// Сортировка содержимого директории в обратном порядке:
const tree2 = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children = fsTrees.getChildren(tree2)
const newMeta2 = _.cloneDeep(fsTrees.getMeta(tree2))
// reverse изменяет массив, поэтому клонируем
const newChildren = [...children].reverse()
const newTree = fsTrees.mkdir(fsTrees.getName(tree2), newChildren, newMeta2)
console.log(newTree)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'three', children: [], meta: {}, type: 'directory' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'one', meta: {}, type: 'file' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }

// Обновление содержимого директории:
// Приведение к нижнему регистру имён директорий и файлов внутри конкретной директории

const tree3 = fsTrees.mkdir('/', [
  fsTrees.mkfile('oNe'),
  fsTrees.mkfile('Two'),
  fsTrees.mkdir('THREE'),
])

const children3 = fsTrees.getChildren(tree3)
const newChildren3 = children3.map((child) => {
  const name = fsTrees.getName(child)
  const newMeta3 = _.cloneDeep(fsTrees.getMeta(child))
  if (fsTrees.isDirectory(child)) {
    const children3 = [...fsTrees.getChildren(child)]
    return fsTrees.mkdir(name.toLowerCase(), children3, newMeta3)
  }
  return fsTrees.mkfile(name.toLowerCase(), newMeta3)
})
// копируем метаданные
const newMeta3 = _.cloneDeep(fsTrees.getMeta(tree3))
const tree4 = fsTrees.mkdir(fsTrees.getName(tree3), newChildren3, newMeta3)
console.log(tree4)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'one', meta: {}, type: 'file' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'three', children: [], meta: {}, type: 'directory' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }

// Удаление файлов внутри директории:
const tree5 = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children5 = fsTrees.getChildren(tree5)
const newChildren5 = children5.filter(fsTrees.isDirectory)
const newMeta5 = _.cloneDeep(fsTrees.getMeta(tree5))
const tree6 = fsTrees.mkdir(fsTrees.getName(tree5), newChildren5, newMeta5)
console.log(tree6)
// => {
// =>   name: '/',
// =>   children: [ { name: 'three', children: [], meta: {}, type: 'directory' } ],
// =>   meta: {},
// =>   type: 'directory'
// => }
