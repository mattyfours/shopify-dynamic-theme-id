import * as core from '@actions/core'
import { branchNameToThemeKey } from './utils'
import { EnvironmentVariables } from './types'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const variables: string = core.getInput('variables')
    const token: string = core.getInput('token')
    const store: string = core.getInput('store')
    const branch: string = core.getInput('branch')

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

    core.debug(`BranchId: ${branchThemeId}`)
    core.setOutput('branchThemeId', branchThemeId)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
