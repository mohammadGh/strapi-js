/* eslint-disable no-console */
import type { FetchError, FetchOptions } from 'ofetch'
import { createFetch, ofetch } from 'ofetch'
import { isTest } from 'std-env'
import { stringify } from 'qs'
import type { StrapiConfig, StrapiErrorResponse, StrapiFetchAdapter } from './types'
import { getBaseUrl } from './config'

function defaultErrors(err: FetchError) {
  return {
    status: 500,
    name: 'UnknownError',
    message: err.message,
    details: err,
  }
}

export function UseStrapiOfetchAdapter(config: Required<StrapiConfig>): StrapiFetchAdapter {
  const baseURL = getBaseUrl(config)

  return async <T> (url: string, fetchOptions: FetchOptions<'json'> & { token?: string } = {}): Promise<T> => {
    const authHeader: HeadersInit = {}

    // if explicity a token provided, we use it for Authorization header
    if (fetchOptions.token)
      authHeader.Authorization = `Bearer ${fetchOptions.token}`

    // request params are encoded as query-params in the request url
    if (fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
      if (params)
        url = `${url}?${params}`

      delete fetchOptions.params
    }

    console.log('[strapi-js] request url: ', url)
    console.log('[strapi-js] request Authorization-Header: ', authHeader.Authorization)

    try {
      // test (msw) issue with ofetch instance
      // https://github.com/unjs/ofetch/issues/295
      const fetchInstance = isTest ? createFetch() : ofetch

      return await <T> fetchInstance(url, {
        retry: config.retry,
        baseURL,
        headers: {
          ...fetchOptions.headers,
          ...authHeader,
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
