import axios from 'axios';
import qs from 'query-string';

export class Request {
  /**
   * Constructor
   * @param {object} params = {} - constructor params
   * @param {function} [params.getBaseURL] - function to override baseURL, on request level
   */
  constructor({ getBaseURL, ...config } = {}) {
    this.getBaseURL = getBaseURL;
    this.instance = axios.create({
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma', skipNull: true }),
      ...config
    });
  }

  /**
   * Gets the http instance
   */
  get http() {
    if (this.getBaseURL && this.instance.defaults.baseURL !== this.getBaseURL()) {
      this.instance.defaults.baseURL = this.getBaseURL();
    }

    return this.instance;
  }

    /**
   * Gets the full service url
   * @param {string} endpoint The endpoint
   * @returns {string} The full url
   */
    getFullUrl(endpoint = '') {
    return `${ this.getBaseURL?.() || '' }${ endpoint }`;
  }
}