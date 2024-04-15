import type {
  StrapiFetchAdapter,
  StrapiFetchOptions,
} from './types'
import type { StrapiUploadParams } from './types/requests'

export function newStrapiUploadSdk(strapiFetch: StrapiFetchAdapter) {
  const getFiles = async (option: StrapiFetchOptions = {}): Promise<'json'> => {
    return await strapiFetch(`/upload/files}`, { ...option, method: 'GET' })
  }

  const getFileById = async (id: string, option: StrapiFetchOptions = {}): Promise<'json'> => {
    return await strapiFetch(`/upload/files/${id}`, { ...option, method: 'GET' })
  }

  const deleteFileById = async (id: string, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch(`/upload/files/${id}`, { ...option, method: 'DELETE' })
  }

  const upload = async (uploadParams: StrapiUploadParams, option: StrapiFetchOptions = {}): Promise<'json'> => {
    const form = new FormData()
    form.append('ref', uploadParams.ref)
    form.append('refId', uploadParams.refId)
    form.append('field', uploadParams.field)
    form.append('files', uploadParams.files)
    return await strapiFetch('/upload', { ...option, body: form, method: 'POST' })
  }

  return {
    getFiles,
    getFileById,
    deleteFileById,
    upload,
  }
}
