import type { FetchOptions } from 'ofetch'

export type { StrapiLocale } from './locales'
export type {
  StrapiUser,
  StrapiAuthResponse,
  StrapiAuthRequest,
  StrapiRegisterRequest,
  StrapiResetPasswordRequest,
  StrapiChangePasswordRequest,
} from './users'
export type { PaginationByPage, PaginationByOffset, StrapiRequestParams } from './requests'
export type { StrapiErrorResponse, StrapiResponseData, StrapiResponseMany } from './responses'

export interface StrapiConfig {
  url?: string
  prefix?: string
  version?: 'v4'
  logType?: 'auto' | 'fatal' | 'info' | 'debug'
  retry?: number
}

export type StrapiFetchAdapter = <T> (url: string, fetchOptions: FetchOptions<'json'> & { token?: string }) => Promise<T>
