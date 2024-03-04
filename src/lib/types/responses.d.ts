export interface StrapiErrorResponse {
  status: number
  name: string
  message: string
  details: Record<string, unknown>
}

export interface StrapiResponseData<T> {
  id: number
  attributes: T
  meta: Record<string, unknown>
}

export interface StrapiResponse<T> {
  data: StrapiResponseData<T> | StrapiResponseData<T>[]
  meta: Record<string, unknown>
}

export interface StrapiResponseSingle<T> {
  data: StrapiResponseData<T>
  meta: Record<string, unknown>
}

export interface StrapiResponseMany<T> {
  data: StrapiResponseData<T>[]
  meta: Record<string, unknown>
}
