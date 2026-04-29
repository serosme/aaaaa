import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'

export function useCommand() {
  const { data: applications } = useFetch('/api/app', {
    default: () => [],
    transform: data => data || [],
    onRequestError: (err) => {
      console.error('请求错误:', err)
    },
    onResponseError: (err) => {
      console.error('响应错误:', err)
    },
  }) as { data: Ref<Application[]> }

  const apps = computed<CommandPaletteItem[]>(() =>
    applications.value.map(app => ({
      label: app.name,
      icon: 'i-lucide-app-window',
      onSelect: () => $fetch(`/api/app/${app.base64url}`),
    })),
  )

  const router = useRouter()
  const pages = computed<CommandPaletteItem[]>(() =>
    router.getRoutes()
      .filter((route) => {
        const path = route.path
        return /^\/[a-z][a-z0-9]*$/i.test(path)
      })
      .map(route => ({
        label: route.path.slice(1).charAt(0).toUpperCase() + route.path.slice(2),
        icon: 'i-lucide-globe',
        onSelect: () => electron.window.create(route.path),
      })),
  )

  const groups = computed<CommandPaletteGroup[]>(() => [
    {
      id: 'pages',
      label: 'Pages',
      items: pages.value,
    },
    {
      id: 'applications',
      label: 'Applications',
      items: apps.value,
    },
  ])

  return {
    groups,
  }
}
