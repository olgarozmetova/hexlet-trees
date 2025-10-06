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

// Обход в глубину (Depth-first search)

const treeA = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

const dfs = (treeA) => {
  // Распечатываем содержимое узла
  console.log(fsTrees.getName(treeA))
  // Если это файл, то возвращаем управление
  if (fsTrees.isFile(treeA)) {
    return
  }

  // Получаем детей
  const children = fsTrees.getChildren(treeA)

  // Применяем функцию dfs ко всем дочерним элементам
  // Множество рекурсивных вызовов в рамках одного вызова функции
  // называется древовидной рекурсией
  children.forEach(dfs)
}

dfs(treeA)
// => /
// => etc
// => bashrc
// => consul.cfg
// => hexletrc
// => bin
// => ls
// => cat

const changeOwner = (tree, owner) => {
  const name = fsTrees.getName(tree)
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  newMeta.owner = owner

  if (fsTrees.isFile(tree)) {
    // Возвращаем обновлённый файл
    return fsTrees.mkfile(name, newMeta)
  }
  // Дальше идет работа, если директория

  const children = fsTrees.getChildren(tree)
  // Ключевая строчка
  // Вызываем рекурсивное обновление каждого ребёнка
  const newChildren = children.map(child => changeOwner(child, owner))
  const newTree = fsTrees.mkdir(name, newChildren, newMeta)

  // Возвращаем обновлённую директорию
  return newTree
}

changeOwner()

// Агрегация данных — это самая важная операция при работе с деревьями
// Здесь мы хотим узнать, сколько всего файлов и директорий содержится в нашем файловом дереве

const treeB = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

// В реализации используем рекурсивный процесс,
// чтобы добраться до самого дна дерева
const getNodesCount = (treeB) => {
  if (fsTrees.isFile(treeB)) {
    // Возвращаем `1` для учёта текущего файла
    return 1
  }

  // Если узел — директория, получаем его потомков
  const children = fsTrees.getChildren(treeB)
  // Здесь начинается самая сложная часть
  // Считаем количество потомков для каждого из потомков,
  // рекурсивно вызывая нашу функцию `getNodesCount`
  const descendantCounts = children.map(getNodesCount)
  // Возвращаем `1` (текущая директория) + общее количество потомков
  return 1 + _.sum(descendantCounts)
}

getNodesCount(treeB) // 8

// Напишем функцию, которая принимает на вход директорию и возвращает список директорий первого уровня вложенности и количество файлов внутри каждой из них, включая все поддиректории

const treeC = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
  ]),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
    fsTrees.mkfile('file.tmp'),
    fsTrees.mkdir('data'),
  ]),
  fsTrees.mkfile('hosts'),
  fsTrees.mkfile('resolve'),
])

const getFilesCount = (node) => {
  if (fsTrees.isFile(node)) {
    return 1
  }

  const children = fsTrees.getChildren(node)
  const descendantCounts = children.map(getFilesCount)
  return _.sum(descendantCounts)
}

const getSubdirectoriesInfo = (treeC) => {
  const children = fsTrees.getChildren(treeC)
  const result = children
    // Нас интересуют только директории
    .filter(fsTrees.isDirectory)
    // Запускаем подсчёт для каждой директории
    .map(child => [fsTrees.getName(child), getFilesCount(child)])

  return result
}

console.log(getSubdirectoriesInfo(treeC))
// => [['etc', 1], ['consul', 2]]

// Aккумулятор - собирает нужные данные во время обхода дерева
// найдём все пустые директории в нашей файловой системе

const treeD = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json'),
      fsTrees.mkdir('data'),
    ]),
  ]),
  fsTrees.mkdir('logs'),
  fsTrees.mkfile('hosts'),
])

const findEmptyDirPaths = (treeD) => {
  const name = fsTrees.getName(treeD)
  const children = fsTrees.getChildren(treeD)
  // Если детей нет, то добавляем директорию
  if (children.length === 0) {
    return name
  }

  // Фильтруем файлы, они нас не интересуют
  const emptyDirNames = children
    .filter(child => !fsTrees.isFile(child))
    // Ищем пустые директории внутри текущей
    // flatMap выправляет массив, так что он остаётся плоским
    .flatMap(findEmptyDirPaths)

  return emptyDirNames
}

findEmptyDirPaths(treeD) // ['apache', 'data', 'logs']

// найдём все пустые директории в нашей файловой системе с максимальной глубиной поиска 2 уровня. То есть директории /logs и /etc/apache подходят под это условие, а вот /etc/consul/data — нет

const findEmptyDirPaths2 = (treeD) => {
  // Внутренняя функция, которая может передавать аккумулятор
  // В качестве аккумулятора выступает depth, переменная, содержащая текущую глубину
  const iter = (node, depth) => {
    const name = fsTrees.getName(node)
    const children = fsTrees.getChildren(node)

    // Если директория пустая, то добавляем ее в список
    if (children.length === 0) {
      return name
    }

    // Если это второй уровень вложенности, и директория не пустая
    // то не имеет смысла смотреть дальше
    if (depth === 2) {
      // Почему возвращается именно пустой массив?
      // Потому что снаружи выполняется flat
      // Он раскрывает пустые массивы
      return []
    }

    // Оставляем только директории
    return (
      children
        .filter(fsTrees.isDirectory)
        // Не забываем увеличивать глубину
        .flatMap(child => iter(child, depth + 1))
    )
  }

  // Начинаем с глубины 0
  return iter(treeD, 0)
}

findEmptyDirPaths2(treeD) // ['apache', 'logs']

// Можно пойти еще дальше и позволить указывать максимальную глубину снаружи:
// const findEmptyDirPaths = (tree, maxDepth = 2) => {
// ...
// }

// а как сделать так, чтобы по умолчанию просматривалось всё дерево? Использовать в качестве значения по умолчанию бесконечность Infinity:

// const findEmptyDirPaths = (tree, maxDepth = Infinity) => {
// ...
// }
