import { type FetchError, type FetchOptions } from 'ofetch'
import { createFetch } from 'ofetch'
import defu from 'defu'
import { joinURL, normalizeURL } from 'ufo'
import { stringify } from 'qs'
import type { StrapiConfigs, StrapiErrorResponse, StrapiFetcher } from './types'

export const strapiDefaultConfigs: StrapiConfigs = {
  url: 'http://localhost:1337/',
  prefix: '/api',
  version: 'v4',
}

export function getStrapiBaseURL(configs?: StrapiConfigs, defaultConfigs?: StrapiConfigs): string {
  const defaults = defaultConfigs || strapiDefaultConfigs
  const mergedConfigs: any = defu(configs || {}, defaults)
  const baseURL = joinURL(normalizeURL(mergedConfigs.url), mergedConfigs.prefix)
  return baseURL
}

function defaultErrors(err: FetchError) {
  return {
    status: 500,
    name: 'UnknownError',
    message: err.message,
    details: err,
  }
}

export function getStrapiFetcher(configs?: StrapiConfigs): StrapiFetcher {
  const baseURL = getStrapiBaseURL(configs)

  return async <T> (url: string, fetchOptions: FetchOptions<'json'> = {}): Promise<T> => {
    const headers: HeadersInit = {}
    let originalHeaders = {}

    if (fetchOptions.params) {
      // if original request has Authorization header, we try to use it for cms authorization
      if (fetchOptions.params.headers) {
        headers.Authorization = fetchOptions.params.headers.Authorization || fetchOptions.params.headers.authorization
        delete fetchOptions.params.headers.Authorization
        delete fetchOptions.params.headers.authorization
        originalHeaders = { ...fetchOptions.params.headers }
        delete fetchOptions.params.headers
      }

      // if explicity a token provided for cms we use it for Authorization header
      if (fetchOptions.params.token) {
        headers.Authorization = `Bearer ${fetchOptions.params.token}`
        delete fetchOptions.params.token
      }

      if (fetchOptions.params) {
        const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
        if (params)
          url = `${url}?${params}`

        delete fetchOptions.params
      }
    }

    try {
      return await <T>createFetch()(url, {
        retry: 0,
        baseURL,
        headers: {
          ...headers,
          ...originalHeaders,
        },
        ...fetchOptions,
      })
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err.data?.error || defaultErrors(err)
      // console.log(' [strapi-client] Error', strapiError)
      throw strapiError
    }
  }
}
