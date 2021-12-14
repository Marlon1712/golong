import useSWR from 'swr'
import api from '../services/api'
export function procedimentFetch<data = any>(url: string) {
  const { data, error, mutate } = useSWR<data>(url, async url => {
    const response = await api.get(url)
    return response.data
  })

  return { data, error, mutate }
}
