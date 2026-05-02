import { execSync } from 'node:child_process'

export default defineEventHandler<{ body: { bin: string, path: string } }>(async (event): Promise<{ success: boolean }> => {
  const { bin, path } = await readBody(event)

  try {
    execSync(`${bin} "${path}"`)
    return { success: true }
  }
  catch {
    return { success: false }
  }
})
