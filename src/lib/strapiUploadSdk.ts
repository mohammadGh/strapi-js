import type {
  StrapiFetchAdapter,
  StrapiFetchOptions,
  StrapiUser,
} from './types'

export function newStrapiUploadSdk(strapiFetch: StrapiFetchAdapter) {
  const getFiles = async (option: StrapiFetchOptions = {}): Promise<'JSON'> => {
    return await strapiFetch(`/upload/files}`, { ...option, method: 'GET' })
  }

  const getFileById = async (id: string, option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/upload/files/${id}`, { ...option, method: 'GET' })
  }

  const deleteFileById = async (id: string, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch(`/upload/files/${id}`, { ...option, method: 'DELETE' })
  }

  // todo: add type for data, i.e: {files: File, ref:string, refId:string, filed: string }
  const upload = async (data: any, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch('/upload', { ...option, body: data, method: 'POST' })
  }

  return {
    getFiles,
    getFileById,
    deleteFileById,
    upload,
  }
}
