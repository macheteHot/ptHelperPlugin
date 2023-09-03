<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { AddWeb, Check, Close, Github, Info, Tool } from '@icon-park/vue-next'
import { IS_ENABLE, DOWNLOAD_CLIENT_URL, BOOK_MARK_TORRENTS } from '@/constants/index'
import useChromeStorage from './tools/useStorage'
import { sleep } from './tools'

const [chromeData, setChromeData] = useChromeStorage()
async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

function toggleEnable() {
  setChromeData({ [IS_ENABLE]: !chromeData[IS_ENABLE] })
}

function toOptions() {
  chrome.runtime.openOptionsPage()
}

function toGithub() {
  chrome.tabs.create({
    url: 'https://github.com/macheteHot/ptHelperPlugin'
  })
}
function toReleases() {
  chrome.tabs.create({
    url: 'https://github.com/macheteHot/ptHelperPlugin/releases'
  })
}
function toIssues() {
  chrome.tabs.create({
    url: 'https://github.com/macheteHot/ptHelperPlugin/issues'
  })
}

async function addPageTorrents() {
  const { url: currentUrl, id } = await getCurrentTab()
  const urlObj = new URL(currentUrl ?? '')
  const bookMarkList = Array.isArray(chromeData[BOOK_MARK_TORRENTS])
    ? (chromeData[BOOK_MARK_TORRENTS] as string[])
    : []
  setChromeData({
    [BOOK_MARK_TORRENTS]: [...new Set([...bookMarkList, `${urlObj.origin}${urlObj.pathname}`])]
  })
  ElMessage.success('添加成功')
  await sleep(1500)
  chrome.tabs.reload(id as number)
}
</script>

<template>
  <div class="d-flex flex-column gap-8 select-none popup">
    <div @click="toggleEnable" class="cursor-pointer">
      <Check
        v-show="chromeData[IS_ENABLE]"
        class="m-t-2"
        theme="outline"
        size="15"
        fill="#27ae60"
      />
      <Close v-show="!chromeData[IS_ENABLE]" theme="outline" size="15" fill="#c45656" />
      <span v-show="chromeData[IS_ENABLE]">一键下载已启用</span>
      <span v-show="!chromeData[IS_ENABLE]">一键下载已停用</span>
      <span class="c-#c45656 m-l-30" v-if="!chromeData[DOWNLOAD_CLIENT_URL]"
        >没有设置下载器地址!</span
      >
    </div>
    <div>
      <Info class="position-relative t-3" theme="outline" size="15" fill="#337ecc" />
      <div>
        <span @click="toIssues" class="cursor-pointer">帮助</span>
        <el-divider direction="vertical" class="m-x-4" border-style="" />
        <span @click="toReleases" class="cursor-pointer">更新日志</span>
        <el-divider direction="vertical" class="m-x-4" border-style="" />
        <Github
          @class="toGithub"
          class="position-relative t-3"
          theme="outline"
          size="16"
          fill="#333"
        />
      </div>
    </div>
    <div class="cursor-pointer" @click="addPageTorrents">
      <AddWeb class="position-relative t-2" theme="outline" size="15" fill="#333" />
      <div>添加当前页为种子列表页</div>
    </div>
    <div @click="toOptions" class="cursor-pointer">
      <Tool class="m-t-2" theme="outline" size="15" fill="#73767a" />
      <a class="text-underline-none">设置</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.popup {
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    background-color: #fff;
    padding: 4px 8px;
    font-size: 12px;
    &:hover {
      background-color: #dedfe0;
    }
  }
}
:deep(.el-divider) {
  border-color: #000;
}
</style>
