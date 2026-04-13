export function useSpeechRecognitionToast() {
  const toast = useToast()

  let id: string | number | undefined

  const add = () => {
    const t = toast.add({
      title: '识别中...',
      duration: 0,
    })
    id = t.id
  }

  const remove = () => {
    if (id) {
      toast.remove(id)
    }
  }

  return {
    add,
    remove,
  }
}
