import type { MessageType } from '../MessageType'

export function sendMessageToPage(
  tabId: number,
  data: { type: 'info' | 'warning' | 'error' | 'success'; srt: string }
) {
  chrome.tabs.sendMessage(tabId, {
    event: 'message',
    data
  } as MessageType)
}
