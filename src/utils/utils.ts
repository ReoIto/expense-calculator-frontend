import { useRouter } from 'next/router'
import Const from './constants'

const Utils = {
  getApiUrlBase() {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_PROD_API_URL_BASE
    } else {
      return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL_BASE
    }
  },

  createRequest(request, successCallback, failedCallback) {
    request
      .then((response) => response.data)
      .then((json) => {
        if (typeof successCallback === 'function') {
          successCallback(json)
        }
      })
      .catch((error) => {
        this.handleApiError(error, failedCallback)
      })
  },

  handleApiError(error, failedCallback) {
    const { response } = error

    if (!response) {
      throw error
    }

    if (failedCallback) {
      failedCallback(response.data, response.status)
      return
    }

    // if (response.status === 404) {
    //   this.goTo404()
    // } else {
    //   this.goTo500()
    // }
  },
}

export default Utils
