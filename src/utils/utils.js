const Utils = {
  getApiUrlBase() {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_PROD_API_URL_BASE
    } else {
      return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL_BASE
    }
  },

  async createRequest({ endPoint, data = null, method }) {
    const JSONdata = JSON.stringify(data)
    const url = `${Utils.getApiUrlBase()}${endPoint}`
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    let response
    if (options.body === 'null') {
      response = await fetch(url, {
        method: options.method,
        headers: options.headers,
      })
    } else {
      response = await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: options.body,
      })
    }

    return response.json()
  },
}

export default Utils
