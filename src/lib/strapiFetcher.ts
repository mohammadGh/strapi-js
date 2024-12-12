import type { FetchError, FetchOptions } from 'ofetch'
import type { StrapiConfig, StrapiErrorResponse, StrapiFetchAdapter } from './types'
import { consola } from 'consola/basic'
import { createFetch, Headers, ofetch } from 'ofetch'
import { stringify } from 'qs'
import { isTest } from 'std-env'
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
    const headers: Headers = new Headers(fetchOptions.headers)

    // if explicity a token provided, we use it for header-authorization
    if (fetchOptions.token) {
      headers.set('Authorization', `Bearer ${fetchOptions.token}`)
      consola.debug('[strapi-js] Explicit jwt token provided and set into headers: ', headers.get('Authorization'))
    }
    else if (!headers.get('Authorization')) {
      consola.debug('[strapi-js] No explicit jwt token nor authorization header found for request')
    }

    // request params are encoded as query-params in the request url using qs library
    if (fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
      if (params)
        url = `${url}?${params}`

      delete fetchOptions.params
    }

    try {
      // test (msw) issue with ofetch instance
      // https://github.com/unjs/ofetch/issues/295
      const fetchInstance = isTest ? createFetch() : ofetch
      const requestOptions = {
        retry: config.retry,
        baseURL,
        ...fetchOptions,
        headers,
      }
      return await <T> fetchInstance(url, requestOptions)
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err.data?.error || defaultErrors(err)
      throw strapiError
    }
  }
}
