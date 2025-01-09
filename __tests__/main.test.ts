/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import { expect, test } from '@jest/globals'
import { branchNameToThemeKey } from '../src/utils'

describe('Convert branch name to variable handle', () => {
  it('Should replace /.- and spaces with _', async () => {
    expect(branchNameToThemeKey('release/1.2.0')).toEqual('RELEASE_1_2_0')
  })
})
