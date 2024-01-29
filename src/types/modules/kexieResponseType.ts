export interface KexieResponse<T = any> {
  code: number
  msg: string
  result: T
}
