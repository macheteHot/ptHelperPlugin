export type MessageType =
  | {
      event: 'fetch'
      data: Parameters<typeof fetch>
    }
  | {
      event: 'getCookies'
      data: null
    }
  | {
      event: 'downloadBtClient'
      data: {
        urls: string[]
        clientType: '1' | '2'
        clientUrl: string
        savePath: string
      }
    }
  | {
      event: 'message'
      data: {
        type: 'info' | 'warning' | 'error' | 'success'
        srt: string
      }
    }
