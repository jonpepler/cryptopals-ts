export const hexToBinary = (hex: string): Buffer => Buffer.from(hex, 'hex')

export const binaryToBase64 = (binary: Buffer): string =>
  binary.toString('base64')

export const hexToBase64 = (hex: string): string =>
  binaryToBase64(hexToBinary(hex)).toString()
