import type { MessageType } from './MessageType'
import type { AnyObj } from '@/interface/index_interface'
import {
  BOOK_MARK_TORRENTS,
  DOWNLOAD_CLIENT_TYPE,
  DOWNLOAD_CLIENT_URL,
  DOWNLOAD_SAVEPATH,
  IS_ENABLE
} from '../constants'
import { Qmsg } from './tools/Qmsg'

async function addTorrentPageDownload(storage: AnyObj) {
  if (window.top !== window.self) return // in iframe
  const { pathname, origin } = window.location
  const bookmarkList = Array.isArray(storage[BOOK_MARK_TORRENTS])
    ? (storage[BOOK_MARK_TORRENTS] as string[])
    : []
  if (!bookmarkList.includes(`${origin}${pathname}`)) {
    if (!/^\/torrents.php$/.test(pathname)) return // not in torrents
  }

  const trList = document.querySelectorAll(
    '.torrents>tbody>tr:not(:first-child)'
  ) as NodeListOf<HTMLTableRowElement>

  trList.forEach((tr) => {
    tr.classList.add('hover-bg-red')
    const btn = document.createElement('div')
    btn.style.display = 'inline'
    btn.style.cursor = 'pointer'
    btn.innerHTML = `<svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 6H9a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-6M24 34v8M14 42h20M32 13l5 5 5-5M37 6v12" stroke="#3498db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    btn.addEventListener('click', () => {
      const linkList = [...tr.querySelectorAll('a')].map((_) => _.href)
      const downloadLink = linkList.find((url) => url.match(/\/download\.php\?id=./))
      if (downloadLink) {
        chrome.runtime.sendMessage({
          event: 'downloadBtClient',
          data: {
            urls: [downloadLink],
            clientType: storage[DOWNLOAD_CLIENT_TYPE],
            clientUrl: storage[DOWNLOAD_CLIENT_URL],
            savePath: storage[DOWNLOAD_SAVEPATH]
          }
        } as MessageType)
      } else {
        Qmsg.error('没有找到下载链接,请联系开发者')
      }
    })
    const td = tr.querySelector('td')
    if (td?.firstChild) {
      if (tr.querySelector('div[title^=leeching]') || tr.querySelector('div[title^=seeding]')) {
        btn.style.visibility = 'hidden'
      }
    }
    const container = document.createElement('div')
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center'
    })
    container.appendChild(btn)
    while (td?.firstChild) {
      container.appendChild(td.firstChild)
    }
    td?.appendChild(container)
  })
}

function handleMessage(request: MessageType) {
  const { event, data } = request
  if (event === 'message') {
    switch (data.type) {
      case 'success':
        Qmsg.success(data.srt)
        break
      case 'info':
        Qmsg.info(data.srt)
        break
      case 'warning':
        Qmsg.warning(data.srt)
        break
      default:
        Qmsg.error(data.srt)
        break
    }
  }
}

function downloadAllTorrent(storage: AnyObj) {
  const btn = document.createElement('button')
  Object.assign(btn.style, {
    border: '0',
    background: '#3498db',
    position: 'fixed',
    top: '120px',
    right: '90px',
    color: '#FFF',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none'
  })

  btn.innerText = '下载当前页所有种子'
  btn.addEventListener('click', async () => {
    const trList = document.querySelectorAll(
      '.torrents>tbody>tr:not(:first-child)'
    ) as NodeListOf<HTMLTableRowElement>
    const linkList = Array.from(trList).map((item) => {
      const [, match = ''] = item.innerHTML.match(/"(download\.php\?id=.+?)"/) as [string, string]
      return `${location.origin}/${match}&letdown=1`
    })
    const newList = [...new Set(linkList)]
    chrome.runtime.sendMessage({
      event: 'downloadBtClient',
      data: {
        urls: newList,
        clientType: storage[DOWNLOAD_CLIENT_TYPE],
        clientUrl: storage[DOWNLOAD_CLIENT_URL],
        savePath: storage[DOWNLOAD_SAVEPATH]
      }
    } as MessageType)
  })
  document.body.appendChild(btn)
}

async function inBookMark() {
  const res = await chrome.storage.local.get()
  const bookmarkList = Array.isArray(res[BOOK_MARK_TORRENTS])
    ? (res[BOOK_MARK_TORRENTS] as string[])
    : []
  const { pathname, origin } = window.location

  return bookmarkList.includes(`${origin}${pathname}`)
}

async function main() {
  const res = await chrome.storage.local.get()
  if (res[IS_ENABLE] !== true) return
  const isInBookMark = await inBookMark()
  if (!isInBookMark) return
  // start message listener
  chrome.runtime.onMessage.addListener(handleMessage)
  // add button to page
  addTorrentPageDownload(res)
  // add download all
  downloadAllTorrent(res)
}

main()
