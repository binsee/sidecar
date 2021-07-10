#!/usr/bin/env ts-node
import { test }  from 'tstest'

import {
  RetType,
}                     from './ret-type'
import {
  getMetadataRetType,
}                     from './metadata-ret-type'
import {
  RET_TYPE_SYMBOL,
}                     from './constants'

test('RetType with metadata', async t => {
  const NATIVE_TYPE       = 'pointer'
  const POINTER_TYPE_LIST = ['Pointer', 'Utf8String'] as const

  class Test {

    @RetType(
      NATIVE_TYPE,
      ...POINTER_TYPE_LIST,
    )
    method (): string { return '' }

  }

  const instance = new Test()
  const data = Reflect.getMetadata(
    RET_TYPE_SYMBOL,
    instance,
    'method',
  )

  /* eslint-disable no-sparse-arrays */
  const EXPECTED_DATA = [
    NATIVE_TYPE,
    ...POINTER_TYPE_LIST,
  ]
  t.deepEqual(data, EXPECTED_DATA, 'should get the method ret type data')
})

test('getRetType()', async t => {
  const NATIVE_TYPE       = 'pointer'
  const POINTER_TYPE_LIST = ['Pointer', 'Utf8String'] as const

  class Test {

    @RetType(
      NATIVE_TYPE,
      ...POINTER_TYPE_LIST,
    )
    method (): string { return '' }

  }

  const instance = new Test()
  const typeList = getMetadataRetType(
    instance,
    'method',
  )

  const EXPECTED_NAME_LIST = [
    NATIVE_TYPE,
    ...POINTER_TYPE_LIST,
  ]
  t.deepEqual(typeList, EXPECTED_NAME_LIST, 'should get decorated method ret type list')
})

test('guard ret native types', async t => {
  const NATIVE_TYPE = 'pointer'

  const getFixture = () => {
    class Test {

      @RetType(NATIVE_TYPE)
      testMethod (): number {
        return 42
      }

    }

    return Test
  }

  t.throws(getFixture, 'should throw because the RetType(char) is not match the design type `number`')
})
