import type { StrapiLocale } from './locales'

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
  token?: string
  fields?: Array<string>
  populate?: string | Array<string> | object
  sort?: string | Array<string>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export interface StrapiUploadParams {
  ref: string
  refId: string
  field: string
  files: File
}
