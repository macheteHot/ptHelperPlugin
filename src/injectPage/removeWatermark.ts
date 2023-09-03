import { REMOVE_WATERMARK } from '@/constants'

function removePtt() {
  if (location.origin !== 'https://www.pttime.org') return
  const style = document.createElement('style')
  style.innerHTML = '#wm_div_id {visibility:hidden};'
  document.head.appendChild(style)
}

async function main() {
  const storage = await chrome.storage.local.get()
  const enable = !!storage[REMOVE_WATERMARK]
  if (!enable) return
  removePtt()
}

main()

console.log('remove run ')
