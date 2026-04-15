import { electron } from '@/utils/electron'

interface FetchResp {
  result: {
    text: string
  }
}

export function useSpeechRecognitionFetch() {
  return async (base64: string) => {
    const speechRecognition = await electron.conf.speechRecognition.get()
    const key = speechRecognition?.key
    if (!key) {
      return 'Key 不存在'
    }

    const response = await fetch('https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'X-Api-Resource-Id': 'volc.bigasr.auc',
        'X-Api-Request-Id': '-1',
        'X-Api-Sequence': '-1',
      },
      body: JSON.stringify({
        audio: {
          data: base64,
        },
        request: {
          model_name: 'bigmodel',
        },
      }),
    })

    const result: FetchResp = await response.json()
    return result.result.text
  }
}
