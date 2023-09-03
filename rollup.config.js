import fs from 'node:fs'
import { resolve, parse as ParsedPath } from 'node:path'
import typescript from '@rollup/plugin-typescript'

// eslint-disable-next-line no-undef
const backgroundFileList = fs.readdirSync(resolve(__dirname, 'src/background'), {
  withFileTypes: true
})
const buildInputObject = backgroundFileList.reduce((t, c) => {
  if (!c.isFile()) return t
  if (/\.d\.ts$/.test(c.name)) return t
  // eslint-disable-next-line no-undef
  return { ...t, [ParsedPath(c.name).name]: resolve(__dirname, 'src/background', c.name) }
}, {})

export default {
  input: buildInputObject,
  output: {
    dir: 'dist/assets',
    format: 'cjs',
    entryFileNames: '[name].js'
  },
  plugins: [typescript()]
}
