import { StrapiContentSdk } from './StrapiContentSdk'
import { StrapiUserSdk } from './StrapiUserSdk'
import { getStrapiFetcher } from './getStrapiFetcher'
import type { StrapiConfigs } from './types'

export function StrapiSdk(config: StrapiConfigs) {
  const strapiFetcher = getStrapiFetcher(config)
  return {
    users: StrapiUserSdk(strapiFetcher),
    contents: StrapiContentSdk(strapiFetcher),
  }
}
