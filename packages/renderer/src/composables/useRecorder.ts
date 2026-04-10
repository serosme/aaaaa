import { onBeforeUnmount, ref } from 'vue'

export function useRecorder() {
  const isRecording = ref(false)
  const audioBlob = ref<Blob | null>(null)
  const audioUrl = ref('')
  const audioBase64 = ref('')

  let mediaRecorder: MediaRecorder | null = null
  let stream: MediaStream | null = null
  let chunks: Blob[] = []

  const clearAudio = () => {
    if (audioUrl.value)
      URL.revokeObjectURL(audioUrl.value)
    audioUrl.value = audioBase64.value = ''
    audioBlob.value = null
  }

  const stopStream = () => {
    stream?.getTracks().forEach(t => t.stop())
    stream = null
  }

  const startRecording = async () => {
    if (isRecording.value)
      return
    clearAudio()
    chunks = []
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = ({ data }) => data.size && chunks.push(data)
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        audioBlob.value = blob
        audioUrl.value = URL.createObjectURL(blob)
        audioBase64.value = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve((reader.result as string).split(',')[1] || '')
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
        stopStream()
        mediaRecorder = null
      }
      mediaRecorder.start()
      isRecording.value = true
    }
    catch (e) {
      stopStream()
      mediaRecorder = null
      console.error('录音失败:', e)
    }
  }

  const stopRecording = () => {
    if (!isRecording.value || !mediaRecorder)
      return
    mediaRecorder.stop()
    isRecording.value = false
  }

  const toggleRecording = () => isRecording.value ? stopRecording() : startRecording()

  onBeforeUnmount(() => {
    if (isRecording.value && mediaRecorder)
      mediaRecorder.stop()
    stopStream()
    clearAudio()
  })

  return {
    isRecording,
    audioBlob,
    audioUrl,
    audioBase64,
    startRecording,
    stopRecording,
    toggleRecording,
    clearAudio,
  }
}
