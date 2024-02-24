/* eslint-disable no-console */
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
    const newHeaders: HeadersInit = {}

    // if explicity a token provided for cms we use it for Authorization header
    if (fetchOptions.params && fetchOptions.params.token) {
      newHeaders.Authorization = `Bearer ${fetchOptions.params.token}`
      delete fetchOptions.params.token
    }

    // other params are encoded as query-params in the request url
    if (fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
      if (params)
        url = `${url}?${params}`

      delete fetchOptions.params
    }

    console.log('[strapi-js] request url: ', url)
    console.log('[strapi-js] request Authorization-Header: ', newHeaders.Authorization)
    // console.log('from strapi-js: \n', 'newHeaders: ', newHeaders, 'original headers: ', fetchOptions.headers)
    try {
      return await <T>createFetch()(url, {
        retry: 0,
        baseURL,
        headers: {
          ...fetchOptions.headers,
          ...newHeaders,
        },
        ...fetchOptions,
      })
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err.data?.error || defaultErrors(err)
      throw strapiError
    }
  }
}
