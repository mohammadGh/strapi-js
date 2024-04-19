export interface StrapiErrorResponse {
  status: number
  name: string
  message: string
  details: Record<string, unknown>
}

export interface StrapiDataResponse<T> {
  id: number
  attributes: T
  meta: Record<string, unknown>
}

export interface StrapiResponse<T> {
  data: StrapiDataResponse<T> | StrapiDataResponse<T>[]
  meta: Record<string, unknown>
}

export interface StrapiSingleResponse<T> {
  data: StrapiDataResponse<T>
  meta: Record<string, unknown>
}

export interface StrapiArrayResponse<T> {
  data: StrapiDataResponse<T>[]
  meta: Record<string, unknown>
}
