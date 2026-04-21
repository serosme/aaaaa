import { Buffer } from 'node:buffer'

export function base64urlEncode(str: string): string {
  return Buffer.from(str, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function base64urlDecode(str: string): string {
  return Buffer.from(
    str
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(str.length / 4) * 4, '='),
    'base64',
  ).toString('utf8')
}
