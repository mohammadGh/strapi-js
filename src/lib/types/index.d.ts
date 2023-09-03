export type { StrapiLocale } from './locales'
export type { StrapiAuthProvider, StrapiUser, StrapiAuthenticationResponse, StrapiAuthenticationRequest, StrapiRegistrationRequest, StrapiForgotPasswordRequest, StrapiResetPasswordRequest, StrapiChangePasswordRequest, StrapiEmailConfirmationRequest } from './users'
export type { PaginationByPage, PaginationByOffset, StrapiRequestParams } from './requests'
export type {StrapiErrorResponse, StrapiResponseData, StrapiResponseMany } from './responses'

export interface StrapiConfigs {
    url?: string;
    prefix?: string;
    version?: string;
}

export type StrapiFetcher = <T> (url: string, fetchOptions: FetchOptions<'json'> = {}) => Promise<T>