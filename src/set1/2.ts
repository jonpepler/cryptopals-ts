import { hexToBinary } from './1'

export const xor = (a: Buffer, b: Buffer): Buffer =>
  Buffer.from(a.map((byte, i) => byte ^ b[i]))

export const binaryToHex = (b: Buffer): string => b.toString('hex')

export const xorHex = (a: string, b: string): string =>
  binaryToHex(xor(hexToBinary(a), hexToBinary(b)))
