import * as core from '@actions/core'
import { branchNameToThemeKey } from './utils'
import { EnvironmentVariables } from './types'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const variables: string = core.getInput('variables', {
      required: true,
      trimWhitespace: true
    })
    const token: string = core.getInput('token', {
      required: true,
      trimWhitespace: true
    })
    const store: string = core.getInput('store', {
      required: true,
      trimWhitespace: true
    })
    const branch: string = core.getInput('branch', {
      required: true,
      trimWhitespace: true
    })

    if (!variables || !token || !store) {
      throw new Error('Environment is not configured')
    }

    const branchVariableHandle = branchNameToThemeKey(branch)
    const branchThemeKey = `QA_THEME__${branchVariableHandle}`

    const variablesJSON: EnvironmentVariables = JSON.parse(variables)

    const branchThemeId = variablesJSON[branchThemeKey] ?? null

    if (!branchThemeId) {
      throw new Error(`Envrionment variable <${branchThemeKey}> is not set`)
    }

    core.setOutput('branchThemeId', `e ${variables}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
