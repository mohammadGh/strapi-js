import { mergeConfig } from './config'
import { StrapiAuthSdk } from './StrapiAuthSdk'
import { UseStrapiOfetchAdapter } from './StrapiFetcher'
import type { StrapiConfig } from './types'

export function StrapiSdk(config: Partial<StrapiConfig>, defaultConfig?: Partial<StrapiConfig>) {
  const mergedConfig = mergeConfig(config, defaultConfig)
  const StrapiFetchAdapter = UseStrapiOfetchAdapter(mergedConfig)
  return {
    config: mergeConfig,
    auth: StrapiAuthSdk(StrapiFetchAdapter),
  }
}
