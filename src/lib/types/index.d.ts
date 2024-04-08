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

export interface StrapiFetchOptions {
  /** explicit jwt token */
  token?: string
  headers?: Record<string, string>
  params?: { [key: string]: any }
  /** timeout in milliseconds */
  timeout?: number
  retry?: number | false
  /** Delay between retries in milliseconds. */
  retryDelay?: number
  /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
  retryStatusCodes?: number[]
}
