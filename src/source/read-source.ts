import { readFile } from 'node:fs/promises'

export const readSource = async (path: string) => {
  try {
    const file = await readFile(path)
    return file.toString('utf-8')
  } catch (maybeError) {
    const message = `Error when reading source file at "${path} - error: ${maybeError}"`
    console.error(message)
    return undefined
  }
}
