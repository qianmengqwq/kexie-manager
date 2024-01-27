export interface KexieResponse<T = any> {
  code: number
  msg: string
  data: T
}
