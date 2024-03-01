// FILEPATH: /Users/vinyadan/PROJECTS/distro-weather-fe/test/unit/services/request.spec.js
import { Request } from '../../../src/services/request';
import axios from 'axios';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {
      baseURL: ''
    }
  }))
}));

jest.mock('query-string', () => ({
  stringify: jest.fn()
}));

describe('Request', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an axios instance with default configuration', () => {
    const request = new Request();
    expect(axios.create).toHaveBeenCalledWith({
      paramsSerializer: expect.any(Function)
    });
    expect(request.http.defaults.baseURL).toBe('');
  });

  it('should create an axios instance with custom configuration', () => {
    const config = { timeout: 1000 };
    new Request(config);
    expect(axios.create).toHaveBeenCalledWith({
      paramsSerializer: expect.any(Function),
      ...config
    });
  });

  it('should update baseURL if getBaseURL function is provided and returns a different value', () => {
    const getBaseURL = jest.fn(() => 'http://new-base-url.com');
    const request = new Request({ getBaseURL });
    expect(request.http.defaults.baseURL).toBe('http://new-base-url.com');
  });

  it('should not update baseURL if getBaseURL function is provided but returns the same value', () => {
    const getBaseURL = jest.fn(() => '');
    const request = new Request({ getBaseURL });
    expect(request.http.defaults.baseURL).toBe('');
  });

  it('should return the full service url', () => {
    const getBaseURL = jest.fn(() => 'http://base-url.com');
    const request = new Request({ getBaseURL });
    expect(request.getFullUrl('/endpoint')).toBe('http://base-url.com/endpoint');
  });

  it('should return the endpoint if getBaseURL is not provided', () => {
    const request = new Request();
    expect(request.getFullUrl('/endpoint')).toBe('/endpoint');
  });
});