import os from 'node:os'
import path from 'node:path'
import Database from 'better-sqlite3'

export default defineEventHandler((): Workspace[] => {
  const db = new Database(path.join(os.homedir(), 'AppData', 'Local', 'Zed', 'db', '0-stable', 'db.sqlite'), { readonly: true })
  const paths = db.prepare('select paths as path from workspaces where paths is not null and paths != \'\'').all() as { path: string }[]
  return paths.map((item) => {
    return {
      bin: 'zed',
      name: path.basename(item.path),
      path: item.path,
    }
  })
})
