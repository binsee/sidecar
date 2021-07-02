#!/usr/bin/env ts-node
import { test }  from 'tstest'

import fs from 'fs'

import {
  partialLookup,
}                         from './partial-lookup'

test('partialLookup()', async t => {
  const EXPECTED_STR = fs.readFileSync(
    require.resolve('../libs/log.js')
  ).toString()
  const source = await partialLookup('log.js')
  t.equal(source, EXPECTED_STR, 'should get right partial file content')
})