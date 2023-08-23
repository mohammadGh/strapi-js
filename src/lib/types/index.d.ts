import type { StrapiLocale } from './locales'

export interface StrapiError {
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

export interface PaginationByPage {
  page: number
  pageSize: number
  withCount?: boolean
}

export interface PaginationByOffset {
  start: number
  limit: number
  withCount?: boolean
}

export interface StrapiRequestParams {
  fields?: Array<string>
  populate?: string | Array<string> | object
  sort?: string | Array<string>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export interface StrapiResponseData<T> {
  id: number,
  attributes: T,
  meta: Record<string, unknown>
}

export interface StrapiResponse<T> {
  data: StrapiResponseData<T> | StrapiResponseData<T>[],
  meta: Record<string, unknown>
}

export interface StrapiResponseSingle<T> {
  data: StrapiResponseData<T>,
  meta: Record<string, unknown>
}

export interface StrapiResponseMany<T> {
  data: StrapiResponseData<T>[],
  meta: Record<string, unknown>
}

export interface StrapiGraphqlVariables {
  [variable: string]: unknown
}

export * from './locales'
export * from './users'