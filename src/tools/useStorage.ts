import type { AnyObj } from '@/interface/index_interface'
import { reactive } from 'vue'

function useChromeStorage() {
  const chromeData = reactive({} as { [key: string]: unknown })

  const setChromeData = (res: AnyObj) => {
    chrome.storage.local.set(res).then(() => {
      Object.assign(chromeData, res)
    })
  }
  chrome.storage.local.get().then((res) => {
    Object.assign(chromeData, res)
  })
  return [chromeData, setChromeData] as const
}

export default useChromeStorage
