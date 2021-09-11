const hexToBinary = (hex: string): string =>
  Buffer.from(hex, 'hex').toString('binary')

const binaryToBase64 = (binary: string): string =>
  Buffer.from(binary, 'binary').toString('base64')

export const hexToBase64 = (hex: string): string =>
  binaryToBase64(hexToBinary(hex))
