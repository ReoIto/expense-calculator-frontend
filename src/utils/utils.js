const Utils = {
  getApiUrlBase() {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_PROD_API_URL_BASE
    } else {
      return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL_BASE
    }
  },

  createRequest({
    endPoint,
    data,
    method,
    successCallBack = null,
    failedCallback = null,
  }) {
    const JSONdata = JSON.stringify(data)
    const url = `${Utils.getApiUrlBase()}${endPoint}`
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    fetch(url, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    })
      .then((response) => response.json())
      .then((result) => {
        if (typeof successCallBack === 'function') {
          successCallBack(result)
        }
      })
      .catch((err) => {
        this.handleApiError(err, failedCallback)
      })
  },

  handleApiError(err, failedCallback = null) {
    const { response } = err
    if (!response) {
      throw err
    }

    if (failedCallback) {
      failedCallback(response.data, response.status)
    }

    console.error(err)
  },
}

export default Utils
