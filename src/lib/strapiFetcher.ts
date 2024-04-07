import type { FetchError, FetchOptions } from 'ofetch'
import { Headers, createFetch, ofetch } from 'ofetch'
import { isTest } from 'std-env'
import { stringify } from 'qs'
import { consola } from 'consola/basic'
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
    const headers: Headers = new Headers(fetchOptions.headers)

    // if explicity a token provided, we use it for header-authorization
    if (fetchOptions.token) {
      headers.set('authorization', `Bearer ${fetchOptions.token}`)
      consola.info('Explicit jwt token provided and set into headers: ', headers.get('authorization'))
    }
    else if (!headers.get('authorization')) {
      consola.warn('No explicit jwt token nor authorization header found for request')
    }

    // request params are encoded as query-params in the request url
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
      consola.debug('Final headers for ofetch: ', requestOptions.headers)

      return await <T> fetchInstance(url, requestOptions)
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err.data?.error || defaultErrors(err)
      throw strapiError
    }
  }
}
