import { mergeConfig } from './config'
import { newStrapiAuthSdk } from './strapiAuthSdk'
import { newStrapiUsersSdk } from './strapiUsersSdk'
import { UseStrapiOfetchAdapter } from './strapiFetcher'
import type { StrapiConfig } from './types'
import { newStrapiUploadSdk } from './strapiUploadSdk'
import { newStrapiCollectionContentSdk } from './strapiCollectionContentSdk'

export function newStrapiSdk(config: Partial<StrapiConfig>, defaultConfig?: Partial<StrapiConfig>) {
  const mergedConfig = mergeConfig(config, defaultConfig)
  const StrapiFetchAdapter = UseStrapiOfetchAdapter(mergedConfig)
  return {
    config: mergeConfig,
    auth: newStrapiAuthSdk(StrapiFetchAdapter),
    users: newStrapiUsersSdk(StrapiFetchAdapter),
    upload: newStrapiUploadSdk(StrapiFetchAdapter),
    content: newStrapiCollectionContentSdk(StrapiFetchAdapter),
  }
}
