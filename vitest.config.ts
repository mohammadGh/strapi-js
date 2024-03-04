import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        ...configDefaults.exclude,
        '**/*.d.ts',
        '*.config.cjs',
        '*.config',
      ],
    },
  },
})
