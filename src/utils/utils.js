const Utils = {
  getApiUrlBase() {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_PROD_API_URL_BASE
    } else {
      return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL_BASE
    }
  },
}

export default Utils
