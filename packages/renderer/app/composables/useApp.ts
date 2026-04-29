export function useApp() {
  const { data: apps } = useFetch('/api/app', {
    default: () => [],
    transform: data => data || [],
    onRequestError: (err) => {
      console.error('请求错误:', err)
    },
    onResponseError: (err) => {
      console.error('响应错误:', err)
    },
  }) as { data: Ref<Application[]> }

  const launch = (base64url: string) => {
    $fetch(`/api/app/${base64url}`)
  }

  return {
    apps,
    launch,
  }
}
