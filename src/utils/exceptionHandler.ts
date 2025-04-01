import { notification } from 'ant-design-vue'
import axios, { type AxiosError } from 'axios'

export class exceptionHandler {
  static handle(error: unknown): void {
    console.error('HTTP Error:', error)

    let message = 'An unknown error occurred'
    let description = ''

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status

      switch (status) {
        case 400:
          message = 'Bad Request'
          description = 'Invalid request. Please check your input.'
          break
        case 401:
          message = 'Unauthorized'
          description = 'You need to log in to access this resource.'
          break
        case 403:
          message = 'Forbidden'
          description = 'You do not have permission to perform this action.'
          break
        case 404:
          message = 'Not Found'
          description = 'The requested resource was not found.'
          break
        case 500:
          message = 'Server Error'
          description = 'Something went wrong on the server. Please try again later.'
          break
        case 503:
          message = 'Service Unavailable'
          description = 'The server is currently unavailable. Please try again later.'
          break
        default:
          message = `Error ${status}`
          description = axiosError.response?.statusText || 'Unexpected error occurred'
      }
    } else if (error instanceof Error) {
      message = 'Error'
      description = error.message
    }

    notification.error({
      message,
      description,
      duration: 3,
    })
  }
}
