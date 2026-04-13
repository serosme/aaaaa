interface FetchResp {
  result: {
    text: string
  }
}

export function useSpeechRecognitionFetch() {
  return async (base64: string) => {
    const response = await fetch('https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash', {
      method: 'POST',
      headers: {
        'x-api-key': '043e700f-e83a-4b89-a007-c526ab320dfd',
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
