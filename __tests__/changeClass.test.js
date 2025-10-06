import _ from 'lodash'
import trees from '../__fixtures__/changeClass.js'
import changeClass from '../src/changeClass.js'
import { expect, test } from '@jest/globals'

test.each(trees)('changeClass', (treeData) => {
  const { htmlTreeSource, htmlTree, classNameFrom, classNameTo } = treeData
  const sourceCloned = _.cloneDeep(htmlTreeSource)

  const result = changeClass(htmlTreeSource, classNameFrom, classNameTo)
  expect(result).toEqual(htmlTree)
  expect(htmlTreeSource).toEqual(sourceCloned)
})
