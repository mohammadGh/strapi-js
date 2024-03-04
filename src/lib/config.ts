import defu from 'defu'
import { joinURL, normalizeURL } from 'ufo'
import type { StrapiConfig } from './types'

export const strapiDefaultConfig: Required<StrapiConfig> = {
  url: 'http://localhost:1337/',
  prefix: '/api',
  version: 'v4',
  logType: 'info',
  retry: 0,
}

/**
 * merge actual-explicit config with strapi-default-config
 *
 * @param config actual and explicit config
 * @param defaultConfig a partial configuration considered as a fallback
 * @returns merged actual-explicit config with provided defaultConfig and with `strapiDefaultConfig`
 */
export function mergeConfig(config: Partial<StrapiConfig>, defaultConfig?: Partial<StrapiConfig>): Required<StrapiConfig> {
  return defu(config || {}, defaultConfig || {}, strapiDefaultConfig)
}

export function getBaseUrl(config: Required<StrapiConfig>) {
  return joinURL(normalizeURL(config.url), config.prefix)
}
