export const branchNameToThemeKey = (branchName: string): string => {
  return branchName.replace(/[\/.\-\s]/g, '_').toUpperCase()
}
