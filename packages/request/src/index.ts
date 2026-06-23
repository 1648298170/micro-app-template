export interface RequestOptions extends RequestInit {
  token?: string
  appName?: string
  appVersion?: string
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.token) headers.set('Authorization', `Bearer ${options.token}`)
  if (options.appName) headers.set('x-app-name', options.appName)
  if (options.appVersion) headers.set('x-app-version', options.appVersion)

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
