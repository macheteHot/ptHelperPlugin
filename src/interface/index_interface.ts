// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => unknown

export type Keys = string | number | symbol

export type AnyObj = Record<string, unknown | never>

export type Key = string | number
