import fs from 'fs'
import path from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getDirectoryTree(dirPath) {
  const name = path.basename(dirPath)
  const stats = fs.statSync(dirPath)
  const tree = {
    name,
    type: stats.isDirectory() ? 'directory' : 'file',
  }
  if (stats.isDirectory()) {
    tree.children = fs
      .readdirSync(dirPath)
      .map(child => getDirectoryTree(path.join(dirPath, child)))
  }
  return tree
}

(async function () {
  try {
    const tree = getDirectoryTree(path.join(__dirname, '../blogs'))
    const RouterConfig = `
    // 该文件自动生成 by scripts/setRouterConfig.mjs
    export default ${JSON.stringify(tree.children)}`
    const fsPath = path.join(__dirname, '../config/router.js')
    fs.writeFileSync(fsPath, RouterConfig)
    const prettier = path.join(__dirname, '../node_modules/.bin/prettier')
    await execa(prettier, ['--write', fsPath], { stdio: 'pipe' })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
