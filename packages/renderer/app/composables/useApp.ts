export function useApp() {
  const apps = ref<Application[]>([])

  const load = async () => {
    apps.value = await $fetch('/api/app')
  }

  const launch = async (base64url: string) => {
    await $fetch(`/api/app/${base64url}`)
  }

  onMounted(load)

  return {
    apps,
    load,
    launch,
  }
}
