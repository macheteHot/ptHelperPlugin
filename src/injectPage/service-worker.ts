import type { MessageType } from './MessageType'
import { sendMessageToPage } from './tools/tools'

async function getCookies(tab: chrome.tabs.Tab) {
  const res = await chrome.cookies.getAll({ url: tab.url })
  return res
}

async function downloadToClient(
  res: { urls: string[]; clientType: '1' | '2'; clientUrl: string; savePath: string },
  sender: chrome.runtime.MessageSender
) {
  console.log('res', res)
  if (!sender.tab) return // the tab is closed
  const cookies = await getCookies(sender.tab)
  const cookieStr = cookies.map((item) => `${item.name}=${item.value}`).join(';')
  if (!res.savePath || !res.clientUrl) {
    chrome.tabs.sendMessage(sender.tab.id!, {
      event: 'message',
      data: {
        type: 'error',
        srt: '你还没有设置客户端'
      }
    } as MessageType)
  }

  const downloadApiUrl = new URL(res.clientUrl)

  if (res.clientType === '1') {
    const payload = {
      autoTMM: false,
      savepath: res.savePath,
      urls: res.urls.join('\n'),
      cookie: cookieStr
    }
    downloadApiUrl.pathname = '/api/v2/torrents/add'
    const data = new URLSearchParams()
    Object.entries(payload ?? {}).forEach(([key, value]) => {
      data.append(key, value as unknown as string)
    })
    const result = await fetch(downloadApiUrl.href, {
      method: 'post',
      body: data,
      referrer: 'no-referrer'
    })
    console.log('fetch', downloadApiUrl.href, result)
    if (result.ok) {
      sendMessageToPage(sender.tab.id!, {
        type: 'success',
        srt: '开始下载'
      })
    } else {
      sendMessageToPage(sender.tab.id!, { type: 'error', srt: '未知错误' })
    }
  } else {
    sendMessageToPage(sender.tab.id!, { type: 'error', srt: '暂不支持' })
  }
  // const res = await fetch()
  // console.log(res)
}

async function handleMessage(request: MessageType, sender: chrome.runtime.MessageSender) {
  const { event, data } = request
  switch (event) {
    case 'downloadBtClient':
      downloadToClient(data, sender)
      break

    default:
      console.log(event, 'not handle!')
      break
  }
}

chrome.runtime.onMessage.addListener(handleMessage)
