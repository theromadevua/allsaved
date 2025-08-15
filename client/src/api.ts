import axios, { type AxiosInstance } from 'axios';

class ApiClient {
  private client: AxiosInstance;
  private static readonly TOKEN_KEY = 'auth_token';

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(config => {
      const token = this.getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.client.interceptors.response.use(
      response => {
        const token = response.data?.data?.token;
        if (token) this.setToken(token);
        return response;
      },
      error => {
        if (error.response?.status === 401) this.removeToken();
        return Promise.reject(error);
      }
    );
  }

  private getToken = () => localStorage.getItem(ApiClient.TOKEN_KEY);
  private setToken = (token: string) => localStorage.setItem(ApiClient.TOKEN_KEY, token);
  private removeToken = () => localStorage.removeItem(ApiClient.TOKEN_KEY);

  async get<T>(url: string, withData?: boolean): Promise<T> {
    const response = await this.client.get(url);
    if(withData)return response.data
    return response.data.data || response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data.data || response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data.data || response.data;
  }

  async delete(url: string): Promise<void> {
    await this.client.delete(url);
  }

  isAuthenticated = () => !!this.getToken();
  clearAuth = () => this.removeToken();
}


export const api = new ApiClient(import.meta.env.VITE_API_BASE_URL as string);
