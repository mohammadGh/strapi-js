import type { StrapiConfig } from './types'
import { mergeConfig } from './config'
import { newStrapiAuthSdk } from './strapiAuthSdk'
import { newStrapiCollectionContentSdk } from './strapiCollectionContentSdk'
import { UseStrapiOfetchAdapter } from './strapiFetcher'
import { newStrapiUploadSdk } from './strapiUploadSdk'
import { newStrapiUsersSdk } from './strapiUsersSdk'

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
