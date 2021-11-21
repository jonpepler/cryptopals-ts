import { hexToBinary } from './1'
import { xor } from './2'

const languageFrequency: { [key: string]: number } = {
  e: 12.02,
  t: 9.1,
  a: 8.12,
  o: 7.68,
  i: 7.31,
  n: 6.95,
  s: 6.28,
  r: 6.02,
  h: 5.92,
  d: 4.32,
  l: 3.98,
  u: 2.88,
  c: 2.71,
  m: 2.61,
  f: 2.3,
  y: 2.11,
  w: 2.09,
  g: 2.03,
  p: 1.82,
  b: 1.49,
  v: 1.11,
  k: 0.69,
  x: 0.17,
  q: 0.11,
  j: 0.1,
  z: 0.0
}

interface DecryptionAttempt {
  key: string
  text: string
  score: number
}

const getBufferScore = (buffer: Buffer): number =>
  Array.from(
    buffer
      .toString()
      .toLowerCase()
      .split('')
      .reduce(
        (acc, value) => acc.set(value, (acc.get(value) ?? 0) + 1),
        new Map<string, number>()
      ),
    ([key, frequency]) => ({
      key,
      frequency: (frequency / buffer.length) * 100
    })
  ).reduce(
    (acc, { key, frequency }) =>
      acc +
      (languageFrequency[key] !== undefined
        ? Math.abs(frequency - languageFrequency[key])
        : 5 * frequency),
    0
  )

const getDecryptionAttempts = (cipher: Buffer): DecryptionAttempt[] =>
  Array.from<number, DecryptionAttempt>({ length: 255 }, (_, i) => {
    const buffer = Buffer.from(
      new Uint8Array(Array.from({ length: cipher.length }, () => i))
    )
    const text = xor(buffer, cipher)
    return {
      key: String.fromCharCode(i),
      text: text.toString(),
      score: getBufferScore(text)
    }
  })

export const findSingleCharKey = (cipher: string): string =>
  getDecryptionAttempts(hexToBinary(cipher)).sort(
    (a, b) => a.score - b.score
  )[0].key
